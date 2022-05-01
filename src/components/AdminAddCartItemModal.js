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
    cursor: "pointer",
    "&:hover": {
        backgroundColor: "#efeeee",
    },
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
    const [selectedItem, setSelectedItem] = useState(null);
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.manage.loading);
    const items = useSelector((state) => state.manage.items);

    const handleSubmit = () => {
        //         article: "SMART.18028"
        // number: 1
        // price: 1.19
        // priceForManager: 0.99
        // sum: 1.19
        // title: "Рукав для запекания Komfi 30 см х 3 м"
        const data = {
            item: selectedItem,
            customer_id: order.customer_id,
        };
        dispatch(setLoading(true));
        adminAPI
            .addItemToOrder(data, order.id)
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

    const Row = ({ index, style }) => (
        <ListRow style={style} onClick={() => setSelectedItem(items[index])}>
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
                    <Button variant="primary" type="submit" disabled={loading} onClick={handleSubmit}>
                        Сохранить
                    </Button>
                </ButtonGroup>
            </Modal.Body>
        </Modal>
    );
}
export default AdminAddCartItemModal;
