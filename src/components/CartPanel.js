import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import { setCartSum } from "../store/manage";
import SelectPrice from "./SelectPrice";
import { useNavigate } from "react-router-dom";

const CartPanelStyled = styled.div(({ sideBarOpened, mobileScreen }) => {
    const getLeft = () => {
        if (mobileScreen) {
            return "0";
        } else {
            return sideBarOpened ? "170px" : "0";
        }
    };

    return {
        position: "absolute",
        bottom: "0",
        height: mobileScreen ? "40px" : "80px",
        backgroundColor: "#ededed",
        left: getLeft(),
        transition: "left 0.5s",
        right: "0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    };
});

const MyButton = styled(Button)({
    "&:focus": {
        outline: "none",
        boxShadow: "none",
    },
});

const Price = styled.div((props) => {
    return {
        textAlign: "center",
        fontSize: props.mobileScreen ? "18px" : "25px",
        fontWeight: "600",
        marginRight: "10px",
        marginLeft: "10px",
    };
});

const PricePanel = styled.div({
    display: "flex",
    justifyContent: "center",
});

function CartPanel() {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const sideBarOpened = useSelector((state) => state.manage.sideBarOpened);
    const mobileScreen = useSelector((state) => state.manage.mobileScreen);
    const priceType = useSelector((state) => state.manage.priceType);
    const cart = useSelector((state) => state.manage.cart);
    const sum = useSelector((state) => state.manage.cartSum);

    const calculateSum = (cart) => {
        let sum = 0;
        for (let i = 0; i < cart.length; i++) {
            let price;
            if (priceType === "с НДС") {
                price = cart[i].price;
            }
            if (priceType === "без НДС") {
                price = cart[i].priceopt;
            }
            if (priceType === "без НДС (от 250р)") {
                price = cart[i].pricemegaopt;
            }
            sum = sum + price * cart[i].number;
        }
        return sum;
    };

    useEffect(() => {
        if (cart.length > 0) {
            const sum = calculateSum(cart);
            dispatch(setCartSum(sum));
        }
        if (cart.length === 0) {
            dispatch(setCartSum(0));
        }
    }, [cart, priceType]);

    return (
        <CartPanelStyled sideBarOpened={sideBarOpened} mobileScreen={mobileScreen}>
            <MyButton
                disabled={cart.length === 0}
                variant="primary"
                size={mobileScreen ? "sm" : ""}
                style={{ marginLeft: mobileScreen ? "15px" : "50px" }}
                onClick={() => navigate("/cart")}
            >
                Оформить
            </MyButton>
            <PricePanel>
                <SelectPrice />
                <Price mobileScreen={mobileScreen}>{sum.toFixed(2)} руб</Price>
            </PricePanel>
        </CartPanelStyled>
    );
}

export default CartPanel;
