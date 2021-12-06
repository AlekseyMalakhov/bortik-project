import React, { useState } from "react";
import styled from "@emotion/styled";
import Table from "react-bootstrap/Table";
import HistoryTableRow from "./HistoryTableRow";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import { addItemToCart } from "../store/manage";
import AddHistoryToCartModal from "./AddHistoryToCartModal";

const HistoryTableBlockStyled = styled.div({
    marginBottom: "20px",
});

const Divider = styled.div({
    display: "flex",
    justifyContent: "center",
    borderBottom: "1px solid #e9e9e9",
    paddingBottom: "20px",
});

const createDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    const month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    const year = date.getFullYear();
    const h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    const m = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    const result = `${day}.${month}.${year} - ${h}:${m}`;
    return result;
};

function HistoryTableBlock({ order }) {
    const dispatch = useDispatch();
    const [showAdded, setShowAdded] = useState(false);
    const [notFound, setNotFound] = useState([]);
    const items = useSelector((state) => state.manage.items);
    const mobileScreen = useSelector((state) => state.manage.mobileScreen);

    const putItemToCart = (orderItem) => {
        const orderItemTest = { ...orderItem };

        //for test only
        // if (orderItemTest.article === "SMART.12026") {
        //     orderItemTest.article = "test";
        // }
        // if (orderItemTest.article === "SMART.14001") {
        //     orderItemTest.article = "test2";
        // }
        //end test

        for (let x in items) {
            const category = items[x];
            if (category.length > 0) {
                for (let i = 0; i < category.length; i++) {
                    const item = category[i];
                    if (item.article === orderItemTest.article) {
                        const obj = {
                            ...item,
                            number: orderItemTest.number,
                        };
                        dispatch(addItemToCart(obj));
                        return false;
                    }
                }
            }
        }
        return orderItem;
    };

    const repeatOrder = () => {
        //console.log(items);
        const notFound = order.items.filter((orderItem) => putItemToCart(orderItem));
        setNotFound(notFound);
        setShowAdded(true);
        console.log(notFound);
    };

    return (
        <HistoryTableBlockStyled>
            <div style={{ fontWeight: "500" }}>Заказ №{order.id}</div>
            <div>Дата: {createDate(Number(order.date))}</div>
            <div>Тип цены: {order.price_type}</div>
            <Table striped bordered hover style={{ fontSize: mobileScreen ? "14px" : "16px" }}>
                <thead>
                    <tr>
                        <th style={{ textAlign: "center" }}>Фото</th>
                        <th>Наименование</th>
                        <th style={{ textAlign: "center" }}>Кол.</th>
                        <th style={{ textAlign: "center" }}>Цена</th>
                    </tr>
                </thead>
                <tbody>
                    {order.items.map((item) => (
                        <HistoryTableRow item={item} key={item.id} />
                    ))}
                    <tr>
                        <th colSpan="3">Общая сумма</th>
                        <th style={{ textAlign: "center" }}>{order.sum}</th>
                    </tr>
                </tbody>
            </Table>
            <Divider>
                <Button variant="primary" onClick={repeatOrder}>
                    Повторить заказ
                </Button>
            </Divider>
            <AddHistoryToCartModal show={showAdded} onHide={() => setShowAdded(false)} notFound={notFound} />
        </HistoryTableBlockStyled>
    );
}

export default HistoryTableBlock;
