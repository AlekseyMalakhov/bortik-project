import React from "react";
import Modal from "react-bootstrap/Modal";
import styled from "@emotion/styled";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Formik } from "formik";
import * as Yup from "yup";
import FormInput from "./FormInput";
import adminAPI from "../api/admin";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, getAdminOrders } from "../store/manage";
import { createDate } from "../utilities/calculate";
import priceTypes from "../settings/priceTypes";
import Dropdown from "react-bootstrap/Dropdown";
import { useState } from "react";
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

function AdminAddCartItemModal({ show, onHide, order, ...otherProps }) {
    const [priceType, setPriceType] = useState(order.price_type);
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.manage.loading);
    const items = useSelector((state) => state.manage.items);

    const validationSchema = Yup.object().shape({
        sum: Yup.number().required("Укажите общую сумму заказа"),
    });

    const handleSubmit = (values) => {
        const data = { ...values };
        data.priceType = priceType;
        dispatch(setLoading(true));
        adminAPI
            .editOrder(data, order.id)
            .then((response) => {
                dispatch(setLoading(false));
                dispatch(getAdminOrders());
                if (response.status === 200) {
                    showAdminDoneModal("Заказ №" + order.id + " успешно отредактирован!");
                } else {
                    showAdminDoneModal("Неизвестная ошибка! Обратитесь к администратору или попробуйте позже.");
                }
                onHide();
            })
            .catch((err) => {
                dispatch(setLoading(false));
                console.log(err);
            });
    };

    const handlePriceType = (type) => {
        setPriceType(type);
    };

    return (
        <Modal show={show} {...otherProps} centered onHide={onHide} size="lg" backdrop="static" keyboard={false}>
            <Modal.Body style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                <p style={{ fontWeight: 700 }}>Заказ №{order.id}. Добавить товар.</p>

                <Formik
                    initialValues={{
                        address: order.address,
                        comment: order.comment,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ handleSubmit, values }) => (
                        <Form noValidate onSubmit={handleSubmit} style={{ width: "100%", paddingLeft: "10px", paddingRight: "10px" }}>
                            <FormInput name="comment" label="Комментарий" formGroupStyle={{ width: "100%" }} as="textarea" />
                            <FormInput name="address" label="Адрес" formGroupStyle={{ width: "100%" }} />
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
            </Modal.Body>
        </Modal>
    );
}
export default AdminAddCartItemModal;
