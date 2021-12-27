import React, { useState } from "react";
import styled from "@emotion/styled";
import Table from "react-bootstrap/Table";
import HistoryTableRow from "./HistoryTableRow";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import { addItemToCart } from "../store/manage";
import AddHistoryToCartModal from "./AddHistoryToCartModal";
import { useTranslation } from "react-i18next";

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
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [showAdded, setShowAdded] = useState(false);
    const [notFound, setNotFound] = useState([]);
    const items = useSelector((state) => state.manage.items);
    const mobileScreen = useSelector((state) => state.manage.mobileScreen);

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

    const repeatOrder = () => {
        const notFound = order.items.filter((orderItem) => putItemToCart(orderItem));
        setNotFound(notFound);
        setShowAdded(true);
        console.log(notFound);
    };

    return (
        <HistoryTableBlockStyled>
            <div style={{ fontWeight: "500" }}>{t("Заказ №") + " " + order.id}</div>
            <div>
                {t("Дата")}: {createDate(Number(order.date))}
            </div>
            <div>
                {t("Тип цены")}: {t(order.price_type)}
            </div>

            {order.items.map((item) => (
                <HistoryTableRow item={item} key={item.id} />
            ))}
            <div style={{ fontWeight: "500", paddingTop: "10px", paddingBottom: "20px" }}>{t("Общая сумма") + ": " + order.sum + " BYN"}</div>

            <Divider>
                <Button variant="primary" onClick={repeatOrder}>
                    {t("Повторить заказ")}
                </Button>
            </Divider>
            <AddHistoryToCartModal show={showAdded} onHide={() => setShowAdded(false)} notFound={notFound} />
        </HistoryTableBlockStyled>
    );
}

export default HistoryTableBlock;
