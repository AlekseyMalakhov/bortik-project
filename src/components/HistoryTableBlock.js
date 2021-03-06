import React, { useState } from "react";
import styled from "@emotion/styled";
import Table from "react-bootstrap/Table";
import HistoryTableRow from "./HistoryTableRow";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import { addItemToCart } from "../store/manage";
import AddHistoryToCartModal from "./AddHistoryToCartModal";
import { useTranslation } from "react-i18next";
import { createDate } from "../utilities/calculate";

const HistoryTableBlockStyled = styled.div`
    border: solid;
    padding: inherit;
    background: #f5f5f6;
    border-radius: 10px;
    margin-bottom: 20px;
    border-width: thin;
    border-color: lightgray;
    padding-bottom: 7px;
`;

const Divider = styled.div`
    display: flex;

    flex-wrap: wrap;
`;

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

    const getStatus = () => {
        if (order.status === "in progress") {
            return t("???? ?????? ???????????????????????? ?????? ??????????!");
        }
        if (order.status === "finished") {
            return t("??????????????");
        }
        return null;
    };

    return (
        <HistoryTableBlockStyled>
            <div style={{ fontWeight: "500" }}>{t("?????????? ???") + " " + order.id}</div>
            <div style={{ paddingLeft: "4px" }}>
                {t("????????????")}: {getStatus()}
            </div>

            <div style={{ paddingLeft: "4px" }}>
                {t("????????")}: {createDate(Number(order.date))}
            </div>
            <div style={{ paddingLeft: "8px" }}>
                {t("?????? ????????")}: {t(order.price_type)}
            </div>
            <div style={{ paddingLeft: "17px" }}>{order.address}</div>
            {order.items.map((item) => (
                <HistoryTableRow item={item} key={item.id} />
            ))}

            <Divider>
                <div style={{ fontWeight: "500", paddingLeft: "10px", paddingTop: "6px" }}>{t("?????????? ??????????") + ": " + order.sum + " BYN"}</div>
                <Button variant="primary" style={{ marginTop: "4px", marginLeft: "auto", padding: "revert" }} onClick={repeatOrder}>
                    {t("?????????????????? ??????????")}
                </Button>
            </Divider>

            <AddHistoryToCartModal show={showAdded} onHide={() => setShowAdded(false)} notFound={notFound} />
        </HistoryTableBlockStyled>
    );
}

export default HistoryTableBlock;
