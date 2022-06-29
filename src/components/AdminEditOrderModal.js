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
import { useEffect } from "react";

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

const StatusDiv = styled.div({
    display: "flex",
    flexDirection: "column",
    marginBottom: "1rem",
    "& .btn": {
        width: "140px",
    },
});

const TotalSum = styled.div({
    marginTop: "15px",
    display: "flex",
    fontWeight: "bold",
});

function AdminEditOrderModal({ show, onHide, order, ...otherProps }) {
    const [priceType, setPriceType] = useState(order.price_type);
    const [status, setStatus] = useState();
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.manage.loading);

    //need test of changing prices, type prices, number of items, deleting and adding items

    const calcSum = (items) => {
        let sum = 0;
        items.forEach((item) => {
            if (priceType === "с НДС") {
                const sumOfItem = item.price_inc_vat * item.number;
                sum = sum + sumOfItem;
            }
            if (priceType === "без НДС") {
                const sumOfItem = item.price_exc_vat * item.number;
                sum = sum + sumOfItem;
            }
        });
        return Number(sum.toFixed(2));
    };

    const handleSubmit = (values) => {
        const data = { ...values };
        data.status = status.value;
        if (order.price_type !== priceType) {
            const newSum = calcSum(order.items);
            data.sum = newSum;
        } else {
            data.sum = order.sum;
        }
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
                showAdminDoneModal("Неизвестная ошибка! Обратитесь к администратору или попробуйте позже.");
                console.log(err);
            });
    };

    const handlePriceType = (type) => {
        setPriceType(type);
    };

    const handleStatus = (st) => {
        setStatus(st);
    };

    const statusTypes = [
        {
            value: "in progress",
            title: "В работе",
        },
        {
            value: "finished",
            title: "Выдан",
        },
    ];

    useEffect(() => {
        if (order) {
            const currentStatus = statusTypes.find((st) => st.value === order.status);
            setStatus(currentStatus);
        }
    }, []);

    return (
        <Modal show={show} {...otherProps} centered onHide={onHide} size="lg" backdrop="static" keyboard={false}>
            <Modal.Body style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                <p style={{ fontWeight: 700 }}>Заказ №{order.id}. Редактирование заказа.</p>

                <Formik
                    initialValues={{
                        address: order.address,
                        comment: order.comment,
                    }}
                    onSubmit={handleSubmit}
                >
                    {({ handleSubmit, values }) => (
                        <Form noValidate onSubmit={handleSubmit} style={{ width: "100%", paddingLeft: "10px", paddingRight: "10px" }}>
                            <p>Покупатель: {order.customer.name}</p>
                            <p>Телефон: {order.customer.phone}</p>
                            <p>email: {order.customer.email}</p>
                            <p>Дата заказа: {createDate(Number(order.date))}</p>
                            <Row1>
                                <FormInput name="comment" label="Комментарий" formGroupStyle={{ width: "100%" }} as="textarea" />
                            </Row1>
                            <Row1>
                                <FormInput name="address" label="Адрес" formGroupStyle={{ width: "100%" }} />
                            </Row1>
                            <Row1>
                                <StatusDiv>
                                    <p style={{ marginBottom: "0.5rem" }}>Тип цены</p>
                                    <DropdownButton drop="down" variant="outline-secondary" title={priceType}>
                                        {priceTypes.map((type) => (
                                            <Dropdown.Item eventKey={type} key={type} onClick={() => handlePriceType(type)}>
                                                {type}
                                            </Dropdown.Item>
                                        ))}
                                    </DropdownButton>
                                </StatusDiv>
                                <StatusDiv>
                                    <p style={{ marginBottom: "0.5rem" }}>Статус</p>
                                    <DropdownButton drop="down" variant="outline-secondary" title={status.title} align="start">
                                        {statusTypes.map((st) => (
                                            <Dropdown.Item eventKey={st.value} key={st.value} onClick={() => handleStatus(st)}>
                                                {st.title}
                                            </Dropdown.Item>
                                        ))}
                                    </DropdownButton>
                                </StatusDiv>
                            </Row1>
                            <Row1>
                                <TotalSum>Общая сумма: {order.sum}</TotalSum>
                            </Row1>

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
export default AdminEditOrderModal;
