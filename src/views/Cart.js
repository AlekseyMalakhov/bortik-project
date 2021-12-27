import React from "react";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import CartTable from "../components/CartTable";
import CartForm from "../components/CartForm";
import { useTranslation } from "react-i18next";
import colors from "../settings/colors";

const Title = styled.div({
    textAlign: "center",
    marginTop: "20px",
    marginBottom: "10px",
    fontSize: "20px",
    fontWeight: "500",
    maxWidth: "1000px",
});

const CartStyled = styled.div({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: colors.lightGreyBackground,
});

function Cart() {
    const { t } = useTranslation();
    const cart = useSelector((state) => state.manage.cart);
    const priceType = useSelector((state) => state.manage.priceType);
    const sum = useSelector((state) => state.manage.cartSum);

    return (
        <CartStyled>
            <Title>{t("Оформление заказа")}</Title>
            <CartTable cart={cart} priceType={priceType} sum={sum} />
            <CartForm cart={cart} priceType={priceType} sum={sum} />
        </CartStyled>
    );
}

export default Cart;
