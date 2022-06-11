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

    const FormikOnChange = ({ onChange }) => {
        const { values } = useFormikContext();

        useEffect(() => {
            onChange(values);
        }, [values, onChange]);
        return null;
    };

    useEffect(() => {
        if (item?.sum) {
            setSum(item.sum);
        }
        if (item?.price) {
            setPriceForClient(item.price);
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
        data.price = priceForClient.toString();
        adminAPI
            .editSoldItem(data, item.id)
            .then((response) => {
                dispatch(setLoading(false));
                dispatch(getAdminOrders());
                onHide();
            })
            .catch((err) => {
                dispatch(setLoading(false));
                console.log(err);
            });
    };

    const handleChange = (e) => {
        let prForClient;
        if (order.price_type === "с НДС") {
            prForClient = Math.round((e.price_for_manager * 1.2 + Number.EPSILON) * 100) / 100;
        }
        if (order.price_type === "без НДС") {
            prForClient = e.price_for_manager;
        }
        setPriceForClient(prForClient);
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
                                <TotalSum>Цена за единицу товара для клиента: {priceForClient}</TotalSum>
                                <TotalSum>Общая сумма: {sum}</TotalSum>
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
