import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Table from "react-bootstrap/Table";
import HistoryTableRow from "./HistoryTableRow";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import { addItemToCart, setCartSum } from "../store/manage";
import AddHistoryToCartModal from "./AddHistoryToCartModal";
import { calculateSum } from "../utilities/calculate";

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
    const cart = useSelector((state) => state.manage.cart);
    const priceType = useSelector((state) => state.manage.priceType);

    const putItemToCart = (orderItem) => {
        const orderItemCheck = { ...orderItem };

        //for test only
        // if (orderItemCheck.article === "SMART.12026") {
        //     orderItemCheck.article = "test";
        // }
        // if (orderItemCheck.article === "SMART.14001") {
        //     orderItemCheck.article = "test2";
        // }
        //end test

        for (let i = 0; i < items.length; i++) {
            if (items[i].article === orderItemCheck.article) {
                const itemForCart = {
                    ...items[i],
                    number: orderItemCheck.number,
                };
                dispatch(addItemToCart(itemForCart));
                return false;
            }
        }
        return orderItem;
    };

    useEffect(() => {
        if (cart.length > 0) {
            const sum = calculateSum(cart, priceType);
            dispatch(setCartSum(sum));
        }
        if (cart.length === 0) {
            dispatch(setCartSum(0));
        }
    }, [cart, priceType]);

    const repeatOrder = () => {
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
            <Table hover style={{ fontSize: mobileScreen ? "14px" : "16px" }}>
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
                        <th colSpan="3" style={{ borderBottomStyle: "none" }}>
                            Общая сумма
                        </th>
                        <th style={{ textAlign: "center", borderBottomStyle: "none" }}>{order.sum}</th>
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
