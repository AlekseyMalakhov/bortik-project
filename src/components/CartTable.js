import React from "react";
import styled from "@emotion/styled";
import Table from "react-bootstrap/Table";
import TableRow from "./TableRow";

const CartTableStyled = styled.div({});

const EmptyCart = styled.div({
    textAlign: "center",
    fontSize: "20px",
    fontWeight: "500",
});

function CartTable({ cart, priceType, sum }) {
    if (cart.length > 0) {
        return (
            <CartTableStyled>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Наименование</th>
                            <th>Кол.</th>
                            <th>Цена</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item) => (
                            <TableRow item={item} priceType={priceType} />
                        ))}
                        <tr>
                            <th colSpan="2">Общая сумма</th>
                            <th>{sum.toFixed(2)}</th>
                        </tr>
                    </tbody>
                </Table>
                Цена: {priceType}
            </CartTableStyled>
        );
    }
    return <EmptyCart>Корзина пуста</EmptyCart>;
}

export default CartTable;
