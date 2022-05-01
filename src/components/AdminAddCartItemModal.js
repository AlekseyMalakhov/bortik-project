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
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

const Row1 = styled.div({
    width: "100%",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
});

const ListRow = styled.div({
    width: "100%",
    display: "flex",
    alignItems: "center",
});

const ButtonGroup = styled.div({
    display: "flex",
    justifyContent: "space-evenly",
    marginTop: "30px",
    marginBottom: "30px",
    width: "100%",
});

const ListContainer = styled.div({
    width: "100%",
    height: "200px",
    position: "relative",
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

    const Row = ({ index, style }) => (
        <ListRow style={style}>
            <div style={{ width: "70%", paddingLeft: "15px", paddingRight: "20px" }}>{items[index].title.ru}</div>
            <div style={{ width: "30%" }}>{items[index].article}</div>
        </ListRow>
    );

    return (
        <Modal show={show} {...otherProps} centered onHide={onHide} size="lg" backdrop="static" keyboard={false}>
            <Modal.Body style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                <p style={{ fontWeight: 700 }}>Заказ №{order.id}. Добавить товар.</p>
                <ListContainer>
                    <AutoSizer>
                        {({ height, width }) => (
                            <List style={{ border: "1px solid black" }} height={200} itemCount={items.length} itemSize={35} width={width}>
                                {Row}
                            </List>
                        )}
                    </AutoSizer>
                </ListContainer>
                <ButtonGroup>
                    <Button variant="outline-primary" onClick={onHide} disabled={loading}>
                        Отмена
                    </Button>
                    <Button variant="primary" type="submit" disabled={loading}>
                        Сохранить
                    </Button>
                </ButtonGroup>
            </Modal.Body>
        </Modal>
    );
}
export default AdminAddCartItemModal;
