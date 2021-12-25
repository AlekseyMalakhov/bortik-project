import React from "react";
import styled from "@emotion/styled";
import Table from "react-bootstrap/Table";
import TableRow from "./TableRow";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const CartTableStyled = styled.div({
    width: "100%",
    maxWidth: "1000px",
});

const EmptyCart = styled.div({
    textAlign: "center",
    fontSize: "20px",
    fontWeight: "500",
});

function CartTable({ cart, priceType, sum }) {
    const { t } = useTranslation();
    const mobileScreen = useSelector((state) => state.manage.mobileScreen);

    if (cart.length > 0) {
        return (
            <CartTableStyled style={{ fontSize: mobileScreen ? "14px" : "16px" }}>
                <Table hover>
                    <thead>
                        <tr>
                            <th style={{ textAlign: "center" }}>{t("Фото")}</th>
                            <th>{t("Наименование")}</th>
                            <th style={{ textAlign: "center" }}>{t("Кол.")}</th>
                            <th style={{ textAlign: "center" }}>{t("Цена")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item) => (
                            <TableRow item={item} priceType={priceType} key={item.id} />
                        ))}
                        <tr style={{ borderBottomStyle: "none" }}>
                            <th colSpan="3" style={{ borderBottomStyle: "none" }}>
                                {t("Общая сумма")}
                            </th>
                            <th style={{ textAlign: "center", borderBottomStyle: "none" }}>{sum.toFixed(2)}</th>
                        </tr>
                    </tbody>
                </Table>
                <div style={{ fontSize: "16px" }}>
                    {t("Цена")}: {t(priceType)}
                </div>
            </CartTableStyled>
        );
    }
    return <EmptyCart>{t("Корзина пуста")}</EmptyCart>;
}

export default CartTable;
