import React from "react";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import CartTable from "../components/CartTable";

const Title = styled.div({
    textAlign: "center",
    margin: "20px 10px",
    fontSize: "20px",
    fontWeight: "500",
});

const CartStyled = styled.div({
    margin: "10px 10px",
});

function Cart() {
    const cart = useSelector((state) => state.manage.cart);
    const priceType = useSelector((state) => state.manage.priceType);
    const sum = useSelector((state) => state.manage.cartSum);

    return (
        <CartStyled>
            <Title>Оформление заказа</Title>
            <CartTable cart={cart} priceType={priceType} sum={sum} />
        </CartStyled>
    );
}

export default Cart;
