import React, { useState } from "react";
import styled from "@emotion/styled";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import SelectPrice from "./SelectPrice";
import { useNavigate } from "react-router-dom";
import CleanCartButton from "./CleanCartButton";
import AskCleanCartModal from "./AskCleanCartModal";
import { cleanCart } from "../store/manage";
import { useTranslation } from "react-i18next";

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
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sideBarOpened = useSelector((state) => state.manage.sideBarOpened);
    const mobileScreen = useSelector((state) => state.manage.mobileScreen);
    const cart = useSelector((state) => state.manage.cart);
    const sum = useSelector((state) => state.manage.cartSum);
    const [showAsk, setShowAsk] = useState(false);

    const handleCleanCart = () => {
        dispatch(cleanCart());
        setShowAsk(false);
    };

    return (
        <CartPanelStyled sideBarOpened={sideBarOpened} mobileScreen={mobileScreen}>
            <MyButton
                disabled={cart.length === 0}
                variant="primary"
                size={mobileScreen ? "sm" : ""}
                style={{ marginLeft: mobileScreen ? "15px" : "50px" }}
                onClick={() => navigate("/cart")}
            >
                {t("Оформить")}
            </MyButton>
            <PricePanel>
                <SelectPrice />
                <Price mobileScreen={mobileScreen}>{sum.toFixed(2)} BYN</Price>
            </PricePanel>
            {cart.length > 0 ? <CleanCartButton onClick={() => setShowAsk(true)} mobileScreen={mobileScreen} /> : null}
            <AskCleanCartModal show={showAsk} onHide={() => setShowAsk(false)} onClean={handleCleanCart} />
        </CartPanelStyled>
    );
}

export default CartPanel;
