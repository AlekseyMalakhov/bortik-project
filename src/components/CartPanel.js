import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";

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

const MyButton = styled(Button)`
    margin-left: 50px;
    &:focus {
        outline: none;
        box-shadow: none;
    }
`;

const Price = styled.div((props) => {
    return {
        textAlign: "center",
        fontSize: props.mobileScreen ? "18px" : "25px",
        fontWeight: "600",
        marginRight: "30px",
    };
});

const calculateSum = (cart) => {
    let sum = 0;
    for (let i = 0; i < cart.length; i++) {
        sum = sum + cart[i].price * cart[i].number;
    }
    return sum;
};

function CartPanel() {
    const sideBarOpened = useSelector((state) => state.manage.sideBarOpened);
    const mobileScreen = useSelector((state) => state.manage.mobileScreen);
    const cart = useSelector((state) => state.manage.cart);

    const [sum, setSum] = useState(0);

    useEffect(() => {
        if (cart.length > 0) {
            const sum = calculateSum(cart);
            setSum(sum);
        }
        if (cart.length === 0) {
            setSum(0);
        }
    }, [cart]);

    return (
        <CartPanelStyled sideBarOpened={sideBarOpened} mobileScreen={mobileScreen}>
            <MyButton variant="primary" size={mobileScreen ? "sm" : ""}>
                Оформить
            </MyButton>
            <Price mobileScreen={mobileScreen}>{sum.toFixed(2)} руб</Price>
        </CartPanelStyled>
    );
}

export default CartPanel;
