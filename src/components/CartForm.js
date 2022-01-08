import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Formik } from "formik";
import * as Yup from "yup";
import FormInput from "./FormInput";
import itemsAPI from "../api/items";
import FormCheckBoxRadio from "./FormCheckBoxRadio";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, getHistory } from "../store/manage";
import CartSentModal from "./CartSentModal";
import { useTranslation } from "react-i18next";
import { getPrice } from "../utilities/calculate";
import FormSelect from "./FormSelect";
import userAPI from "../api/user";
import { setUser } from "../store/manage";

const MyContainer = styled.div({
    paddingRight: "10px",
    paddingLeft: "10px",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    maxWidth: "1000px",
});

const CartFormStyled = styled.div({
    marginTop: "30px",
    marginBottom: "20px",
    backgroundColor: "white",
    padding: "20px 20px",
    borderRadius: "8px",
    width: "100%",
});

const CheckGroup = styled.div({
    marginTop: "30px",
});

const ButtonGroup = styled.div({
    display: "flex",
    justifyContent: "space-evenly",
    marginTop: "30px",
});

const OneButtonContainer = styled.div({
    display: "flex",
    justifyContent: "center",
    marginTop: "10px",
    marginBottom: "10px",
});

const payment_methods = [
    {
        id: 1,
        label: "Безналичный расчет (для юридических лиц)",
        value: "Безналичный расчет (для юридических лиц)",
    },
    {
        id: 2,
        label: "Наличными",
        value: "Наличными",
    },
    {
        id: 3,
        label: "Банковской картой (только при самовывозе)",
        value: "Банковской картой (только при самовывозе)",
    },
    {
        id: 4,
        label: "Банковский перевод по реквизитам",
        value: "Банковский перевод по реквизитам",
    },
];

const delivery_methods = [
    {
        id: 1,
        label: "по Минску",
        value: "по Минску",
    },
    {
        id: 2,
        label: "по Беларуси",
        value: "по Беларуси",
    },
    {
        id: 3,
        label: "Самовывоз",
        value: "Самовывоз",
    },
];

function CartForm({ cart, priceType, sum }) {
    const { t } = useTranslation();
    const user = useSelector((state) => state.manage.user);
    const [showDone, setShowDone] = useState("hide");
    const [email, setEmail] = useState("");
    const [orderID, setOrderID] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        name: Yup.string().required(t("Укажите имя")),
        email: Yup.string().required(t("Укажите email")).email(t("Укажите email")),
        phone: Yup.string().required(t("Укажите телефон")),
    });

    const [newAdress, setNewAdress] = useState(false);
    useEffect(() => {
        if (!user) {
            setNewAdress(true);
        }
    }, [user]);

    const calcSum = (item) => {
        let sum;
        if (priceType === "с НДС") {
            sum = item.priceIncVAT * item.number;
        }
        if (priceType === "без НДС") {
            sum = item.priceExcVAT * item.number;
        }

        return Number(sum.toFixed(2));
    };

    const handleSubmit = (values) => {
        setEmail(values.email);
        const addr = [
            {
                id: Date.now(),
                name: values.address,
            },
        ];
        const customer = { ...values };
        customer.address = JSON.stringify(addr);

        const newCart = [];
        for (let i = 0; i < cart.length; i++) {
            const item = {
                title: cart[i].title.ru,
                article: cart[i].article,
                number: cart[i].number,
                price: getPrice(cart[i], priceType),
                sum: calcSum(cart[i]),
            };
            newCart.push(item);
        }

        const data = {
            cart: newCart,
            customer,
            priceType,
            sum: Number(sum.toFixed(2)),
            date: Date.now(),
        };

        if (user) {
            data.customer.id = user.id;
        }

        if (user && newAdress) {
            const isOld = user.address.find((address) => address.name === values.address);
            if (!isOld) {
                const newAddr = {
                    id: Date.now(),
                    name: values.address,
                };
                const newAddresses = [...user.address, newAddr];
                const addressesString = JSON.stringify(newAddresses);
                userAPI.addAddress({ address: addressesString }, user.id).then((response) => {
                    if (response.status === 200) {
                        const updatedUser = { ...user };
                        updatedUser.address = newAddresses;
                        dispatch(setUser(updatedUser));
                        localStorage.setItem("user", JSON.stringify(updatedUser));
                    }
                });
            }
        }

        dispatch(setLoading(true));
        itemsAPI
            .sendCart(data)
            .then((response) => {
                dispatch(setLoading(false));
                if (response.status === 200) {
                    setOrderID(response.data.orderID);
                    if (user) {
                        dispatch(getHistory(user.id));
                    }
                    setShowDone("OK");
                } else {
                    setShowDone("Error");
                    console.log("error");
                }
            })
            .catch((err) => {
                dispatch(setLoading(false));
                setShowDone("Error");
                console.log(err);
            });
    };

    const cancel = () => {
        navigate("/");
    };

    return (
        <MyContainer>
            <CartFormStyled>
                <Formik
                    initialValues={{
                        name: user ? user.name : "",
                        email: user ? user.email : "",
                        phone: user ? user.phone : "",
                        payment_method: "Безналичный расчет (для юридических лиц)",
                        delivery: "по Минску",
                        address: user ? user.address[0].name : "",
                        comment: "",
                    }}
                    enableReinitialize
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ handleSubmit }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <FormInput name="name" label={t("ФИО") + "*"} />
                            <FormInput name="phone" label={t("Телефон") + "*"} inputMode="tel" placeholder={"+375xxxxxxxxx"} />
                            <FormInput name="email" label="Email*" inputMode="email" />
                            {newAdress ? (
                                <FormInput name="address" label={t("Адрес доставки")} />
                            ) : (
                                <FormSelect name="address" label={t("Адрес доставки")} options={user ? user.address : []} />
                            )}

                            {user ? (
                                <OneButtonContainer>
                                    {newAdress ? (
                                        <Button variant="primary" onClick={() => setNewAdress(false)}>
                                            {t("Адрес из списка")}
                                        </Button>
                                    ) : (
                                        <Button variant="primary" onClick={() => setNewAdress(true)}>
                                            {t("Другой адрес")}
                                        </Button>
                                    )}
                                </OneButtonContainer>
                            ) : null}

                            <FormInput name="comment" label={t("Комментарий")} as="textarea" />
                            <CheckGroup>
                                <Form.Label>{t("Способ оплаты:")}</Form.Label>
                                {payment_methods.map((method) => (
                                    <FormCheckBoxRadio name="payment_method" label={t(method.label)} value={method.value} key={method.id} />
                                ))}
                            </CheckGroup>
                            <CheckGroup>
                                <Form.Label>{t("Доставка")}:</Form.Label>
                                {delivery_methods.map((method) => (
                                    <FormCheckBoxRadio name="delivery" label={t(method.label)} value={method.value} key={method.id} />
                                ))}
                            </CheckGroup>
                            <ButtonGroup>
                                <Button variant="outline-primary" onClick={cancel}>
                                    {t("Отмена")}
                                </Button>
                                <Button variant="primary" type="submit">
                                    {t("Отправить")}
                                </Button>
                            </ButtonGroup>
                        </Form>
                    )}
                </Formik>
                <CartSentModal
                    show={showDone !== "hide"}
                    onHide={() => setShowDone("hide")}
                    backdrop="static"
                    keyboard={false}
                    email={email}
                    showDone={showDone}
                    orderID={orderID}
                />
            </CartFormStyled>
        </MyContainer>
    );
}

export default CartForm;
