import React from "react";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import CartItem from "./CartItem";
import "../App.css";

const CartTableStyled = styled.div({
    // width: "100%",
    maxWidth: "1000px",
    paddingLeft: "10px",
    paddingRight: "10px",
});

const EmptyCart = styled.div({
    textAlign: "center",
    fontSize: "20px",
    fontWeight: "500",
});

function CartTable({ cart, priceType, sum }) {
    const { t } = useTranslation();

    if (cart.length > 0) {
        return (
            <CartTableStyled>
            <div style={{width:"100%",display: "flex",flexDirection: "row",flexWrap: "wrap",padding: "10px 0",}}>
                <div>
                    {cart.map((item) => (
                        <CartItem item={item} priceType={priceType} key={item.id} />
                    ))}
                </div>

                
                <div className="container" style={{width: "250px",marginTop: "8px",marginLeft: "8px"}}>
                    <div style={{position: "sticky",top: "10rem",}}>
                    <div style={{ fontWeight: "500", padding: "2px 10px" }}>{t("Общая сумма") + ": " + sum.toFixed(2) + " BYN"}</div>

                    <div style={{ fontSize: "16px", padding: "2px 10px" }}>
                        {t("Цена")}: {t(priceType)}
                    </div>
                    </div>
                    </div>
                </div>
            </CartTableStyled>
        );
    }
    return <EmptyCart>{t("Корзина пуста")}</EmptyCart>;
}

export default CartTable;
