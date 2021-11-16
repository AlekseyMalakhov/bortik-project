import React from "react";
import styled from "@emotion/styled";
import colors from "../settings/colors";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";

const MyButton = styled(Button)`
    margin-left: 50px;
`;

const Price = styled.div({
    textAlign: "center",
    fontSize: "25px",
    fontWeight: "600",
    marginRight: "30px",
});

function CartPanel() {
    const sideBarOpened = useSelector((state) => state.manage.sideBarOpened);

    const CartPanelStyled = styled.div({
        position: "absolute",
        bottom: "0",
        height: "80px",
        backgroundColor: colors.lightGreyBackground,
        left: sideBarOpened ? "170px" : "0",
        right: "0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    });

    return (
        <CartPanelStyled>
            <MyButton variant="primary">Оформить</MyButton>
            <Price>{25.5} руб</Price>
        </CartPanelStyled>
    );
}

export default CartPanel;
