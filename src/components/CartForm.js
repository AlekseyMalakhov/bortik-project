import React from "react";
import styled from "@emotion/styled";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Formik } from "formik";
import * as Yup from "yup";
import FormInput from "./FormInput";
import itemsAPI from "../api/items";
import FormCheckBox from "./FormCheckBox";
import { useNavigate } from "react-router";

const CartFormStyled = styled.div({
    marginTop: "30px",
});

const CheckGroup = styled.div({
    marginTop: "30px",
});

const ButtonGroup = styled.div({
    display: "flex",
    justifyContent: "space-evenly",
    marginTop: "30px",
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

const validationSchema = Yup.object().shape({
    name_user: Yup.string().required("Укажите имя"),
    email: Yup.string().required("Укажите email").email("Укажите email"),
    phone: Yup.string().required("Укажите телефон"),
});

function CartForm({ cart, priceType, sum }) {
    let navigate = useNavigate();

    const calcSum = (item) => {
        let sum;
        if (priceType === "с НДС") {
            sum = item.price * item.number;
        }
        if (priceType === "без НДС") {
            sum = item.priceopt * item.number;
        }
        if (priceType === "без НДС (от 250р)") {
            sum = item.pricemegaopt * item.number;
        }

        return sum.toFixed(2);
    };

    const getPrice = (item) => {
        if (priceType === "с НДС") {
            return item.price;
        }
        if (priceType === "без НДС") {
            return item.priceopt;
        }
        if (priceType === "без НДС (от 250р)") {
            return item.pricemegaopt;
        }
    };

    const handleSubmit = (values) => {
        console.log(values);
        console.log(cart);

        const newCart = [];
        for (let i = 0; i < cart.length; i++) {
            const item = {
                title: cart[i].title,
                article: cart[i].article,
                number: cart[i].number,
                price: getPrice(cart[i]),
                sum: calcSum(cart[i]),
            };
            newCart.push(item);
        }

        const data = {
            cart: newCart,
            customer: values,
            priceType,
            sum: sum.toFixed(2),
        };

        console.log(data);

        itemsAPI
            .sendCart(data)
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const cancel = () => {
        navigate("/");
    };

    return (
        <CartFormStyled>
            <Formik
                initialValues={{
                    // name_user: "test",
                    // email: "test@test.com",
                    // phone: "+375111222333",
                    name_user: "",
                    email: "",
                    phone: "",
                    payment_method: "Безналичный расчет (для юридических лиц)",
                    delivery: "по Минску",
                    address: "",
                    comment: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ handleSubmit }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <FormInput name="name_user" label="ФИО*" />
                        <FormInput name="phone" label="Телефон*" inputMode="tel" placeholder={"+375xxxxxxxxx"} />
                        <FormInput name="email" label="Email*" inputMode="email" />
                        <FormInput name="address" label="Адрес доставки" />
                        <FormInput name="comment" label="Комментарий" as="textarea" />
                        <CheckGroup>
                            <Form.Label>Способ оплаты:</Form.Label>
                            {payment_methods.map((method) => (
                                <FormCheckBox name="payment_method" label={method.label} value={method.value} key={method.id} />
                            ))}
                        </CheckGroup>
                        <CheckGroup>
                            <Form.Label>Доставка:</Form.Label>
                            {delivery_methods.map((method) => (
                                <FormCheckBox name="delivery" label={method.label} value={method.value} key={method.id} />
                            ))}
                        </CheckGroup>
                        <ButtonGroup>
                            <Button variant="outline-primary" onClick={cancel}>
                                Отмена
                            </Button>
                            <Button variant="primary" type="submit">
                                Отправить
                            </Button>
                        </ButtonGroup>
                    </Form>
                )}
            </Formik>
        </CartFormStyled>
    );
}

export default CartForm;
