import React from "react";
import styled from "@emotion/styled";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AddRemove from "./AddRemove";
import { useTranslation } from "react-i18next";
import { getPrice } from "../utilities/calculate";

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

const BottomCol = styled(Col)({
    display: "flex",
    justifyContent: "center",
    "@media screen and (max-width: 768px)": {
        marginTop: "20px",
    },
});

const MyCol = styled(Col)`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    padding: 10px 10px;
    text-align: center;
`;

const RetailPrice = styled.div({
    fontSize: "18px",
    fontWeight: "500",
    padding: "2px 5px",
    borderRadius: "3px",
});

function CartItem({ item, priceType }) {
    const { t, i18n } = useTranslation();

    return (
        <CartItemStyled>
            <MyRow>
                {item.img ? (
                    <Col xs="auto">
                        <img src={item.img} alt={""} width="80" height="80"></img>
                    </Col>
                ) : null}
                <MyCol style={{ fontWeight: "500" }} xs={8} sm={8} md={5}>
                    {item.title[i18n.resolvedLanguage]}
                </MyCol>
                <BottomCol xs={7} sm={6} md={3}>
                    <AddRemove item={item} inCart={item} type="small" />
                </BottomCol>
                <BottomCol xs={5} sm={6} md={2}>
                    <RetailPrice>{getPrice(item, priceType)} BYN</RetailPrice>
                </BottomCol>
            </MyRow>
        </CartItemStyled>
    );
}

export default CartItem;
