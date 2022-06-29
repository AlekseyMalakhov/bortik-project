import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import styled from "@emotion/styled";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Formik, useFormikContext } from "formik";
import * as Yup from "yup";
import FormInput from "../components/FormInput";
import adminAPI from "../api/admin";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, getAdminOrders } from "../store/manage";
import { showAdminDoneModal } from "../utilities/helpers";

const Row1 = styled.div({
    width: "100%",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
});

const ButtonGroup = styled.div({
    display: "flex",
    justifyContent: "space-evenly",
    marginTop: "30px",
    marginBottom: "30px",
});

const TotalSum = styled.div({
    display: "flex",
});

function AdminEditCartItemModal({ show, onHide, order, item, ...otherProps }) {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.manage.loading);
    const [sum, setSum] = useState();
    const [priceForClient, setPriceForClient] = useState();
    const [priceExcVAT, setPriceExcVAT] = useState();
    const [priceIncVAT, setPriceIncVAT] = useState();
    const [specialCase, setSpecialCase] = useState(false);

    const FormikOnChange = ({ onChange }) => {
        const { values } = useFormikContext();

        useEffect(() => {
            onChange(values);
        }, [values, onChange]);
        return null;
    };

    useEffect(() => {
        if (item) {
            setSum(item.sum);
            //setPriceForClient(item.price);
            const check = item.price_for_manager / item.price_exc_vat;
            console.log(check);
            if (check > 2) {
                setSpecialCase(true);
            } else {
                setSpecialCase(false);
            }
        }
    }, [item]);

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Укажите название товара"),
        article: Yup.string().required("Укажите артикул"),
        number: Yup.number().required("Укажите число товаров"),
        price_for_manager: Yup.number().nullable().required("Укажите цену за единицу товара для менеджера"),
    });

    const handleSubmit = (values) => {
        dispatch(setLoading(true));
        const data = { ...values };
        data.sum = sum.toString();
        data.price = priceForClient.toString(); //price возможно понадобится для писем
        data.price_exc_vat = priceExcVAT.toString();
        data.price_inc_vat = priceIncVAT.toString();
        data.orderID = order.id;
        adminAPI
            .editSoldItem(data, item.id)
            .then((response) => {
                dispatch(setLoading(false));
                dispatch(getAdminOrders());
                if (response.status === 200) {
                    showAdminDoneModal("Товар успешно отредактирован!");
                } else {
                    showAdminDoneModal("Неизвестная ошибка! Обратитесь к администратору или попробуйте позже.");
                }
                onHide();
            })
            .catch((err) => {
                dispatch(setLoading(false));
                showAdminDoneModal("Неизвестная ошибка! Обратитесь к администратору или попробуйте позже.");
                console.log(err);
            });
    };

    /*
    priceExcVAT: price,
    priceIncVAT: Math.round((price * 1.2 + Number.EPSILON) * 100) / 100,
    priceForManager: price,

    //handle units
            if (item.unit === "тыс. шт/1000 шт") {
                const regex = /(\d+)\sшт/;
                const found = item.title.ru.match(regex);
                if (found && found[1]) {
                    //console.log(item.title.ru + " штуки штуки");
                    //console.log(found[1]);
                    const newPrice = (item.priceExcVAT / 1000) * found[1];
                    item.priceExcVAT = Math.ceil((newPrice + Number.EPSILON) * 100) / 100;
                    item.priceIncVAT = Math.ceil((newPrice * 1.2 + Number.EPSILON) * 100) / 100;

                    //console.log(newPrice);
                    //console.log(item.priceExcVAT);
                }
            }


            {
        id: 'SMART.34187_1573',
        category2: 'Ланч-боксы',
        article: 'SMART.34187',
        title: {
          ru: 'Ланч-бокс 3-х секционный из сахарного тросника 50 шт',
          zh: '甘蔗三节饭盒50个',
          en: 'Lunch box 3-section Sugar Cane 50 pcs'
        },
        presence: 0.05,
        unit: 'тыс. шт/1000 шт',
        img: 'https://smartikon.by/uploads/SMART.34187.webp',
        priceExcVAT: 51.05,
        priceIncVAT: 61.26,
        priceForManager: 1020.92,
        discount: null,
        selected: true,
        category1: 'Одноразовая посуда',
        group: 'Хозяйственные товары'
      },
    */

    const handleChange = (e) => {
        let prForClient;
        let prExcVAT = e.price_for_manager;
        let prIncVAT = Math.round((prExcVAT * 1.2 + Number.EPSILON) * 100) / 100;
        if (specialCase) {
            const coef = item.price_for_manager / item.price_exc_vat;
            prExcVAT = e.price_for_manager / coef;
            prExcVAT = Math.ceil((prExcVAT + Number.EPSILON) * 100) / 100;
            prIncVAT = Math.ceil((prExcVAT * 1.2 + Number.EPSILON) * 100) / 100;
        }
        if (order.price_type === "с НДС") {
            prForClient = prIncVAT;
        }
        if (order.price_type === "без НДС") {
            prForClient = prExcVAT;
        }
        setPriceForClient(prForClient);
        setPriceExcVAT(prExcVAT);
        setPriceIncVAT(prIncVAT);
        const s = prForClient * e.number;
        setSum(Number(s.toFixed(2)));
    };

    return (
        <Modal show={show} {...otherProps} centered onHide={onHide} size="lg" backdrop="static" keyboard={false}>
            <Modal.Body style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                <p style={{ fontWeight: 700 }}>Заказ №{order.id}. Редактирование товара.</p>
                {item ? (
                    <Formik
                        initialValues={{
                            title: item.title,
                            article: item.article,
                            number: item.number,
                            price_for_manager: item.price_for_manager ? item.price_for_manager : "",
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ handleSubmit, values }) => (
                            <Form noValidate onSubmit={handleSubmit} style={{ width: "100%", paddingLeft: "10px", paddingRight: "10px" }}>
                                <FormInput name="title" label="Наименование" />
                                <Row1>
                                    <FormInput name="article" label="Артикул" formGroupStyle={{ width: "100%", paddingRight: "20px" }} />
                                </Row1>
                                <Row1>
                                    <FormInput
                                        name="price_for_manager"
                                        label="Цена за единицу товара для менеджера"
                                        formGroupStyle={{ width: "100%" }}
                                    />
                                    <FormInput name="number" label="Количество" formGroupStyle={{ width: "100%", paddingLeft: "20px" }} />
                                </Row1>
                                {specialCase ? <TotalSum style={{ fontWeight: "bold" }}>Размерность тыс. шт/1000 шт !!!</TotalSum> : null}
                                <TotalSum>Цена за единицу товара для клиента: {priceForClient}</TotalSum>
                                <TotalSum style={{ fontWeight: "bold" }}>Общая сумма: {sum}</TotalSum>
                                <FormikOnChange onChange={handleChange} />
                                <ButtonGroup>
                                    <Button variant="outline-primary" onClick={onHide} disabled={loading}>
                                        Отмена
                                    </Button>
                                    <Button variant="primary" type="submit" disabled={loading}>
                                        Сохранить
                                    </Button>
                                </ButtonGroup>
                            </Form>
                        )}
                    </Formik>
                ) : null}
            </Modal.Body>
        </Modal>
    );
}
export default AdminEditCartItemModal;
