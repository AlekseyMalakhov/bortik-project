import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AddRemove from "./AddRemove";
import { useSelector, useDispatch } from "react-redux";

import { useTranslation } from "react-i18next";

const CartItemStyled = styled(Container)`
    position: relative;
    background-color: white;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 10px 10px;
    max-width: 1000px;
    border-radius: 8px;
`;

const MyRow = styled(Row)`
    justify-content: space-evenly;
    align-items: center;
`;

const MyCol = styled(Col)`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    padding: 10px 10px;
    text-align: center;
`;

const Prices = styled(Col)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    padding: 10px 10px;
    text-align: center;
    max-width: 200px;
`;

const RetailPrice = styled.div({
    //backgroundColor: "#69F0AE",
    fontSize: "18px",
    fontWeight: "500",
    padding: "2px 5px",
    borderRadius: "3px",
});

function CartItem({ item, priceType }) {
    const { t, i18n } = useTranslation();
    const mobileScreen = useSelector((state) => state.manage.mobileScreen);

    const getPrice = () => {
        if (priceType === "с НДС") {
            return item.price;
        }
        if (priceType === "без НДС") {
            return item.priceopt;
        }
        if (priceType === "без НДС (от 250р)") {
            return item.pricemegaopt;
        }
    };

    return (
        <CartItemStyled>
            <MyRow>
                {item.img ? (
                    <Col xs="auto">
                        <img src={item.img} alt={""} width="100" height="100"></img>
                    </Col>
                ) : null}
                <MyCol style={{ fontWeight: "500" }} xs={12} sm={12} md={5}>
                    {item.title[i18n.resolvedLanguage]}
                </MyCol>

                <Col xs="auto">
                    <AddRemove item={item} inCart={item} />
                </Col>
                <Prices sm={12} md={3}>
                    <RetailPrice>{getPrice()} BYN</RetailPrice>
                </Prices>
            </MyRow>
        </CartItemStyled>
    );
}

export default CartItem;
