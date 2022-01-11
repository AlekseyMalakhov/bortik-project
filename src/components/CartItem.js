import React, { useState } from "react";
import styled from "@emotion/styled";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AddRemove from "./AddRemove";
import { useTranslation } from "react-i18next";
import { getPrice } from "../utilities/calculate";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { makeSelected } from "../store/manage";

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
    position: relative;
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

const CheckDesktop = styled.div({
    width: "20px",
    padding: "0 0",
    marginLeft: "20px",
    "& input.form-check-input:checked": {
        backgroundColor: "#54cc91",
        borderColor: "#54cc91",
    },
    "@media screen and (max-width: 350px)": {
        position: "absolute",
        top: 0,
        left: 0,
    },
});

const ImageDesktop = styled.div({
    display: "flex",
    justifyContent: "center",
    width: "90px",
    padding: "0 0",
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
    const dispatch = useDispatch();
    const [selected, setSelected] = useState(true);

    const handleSelect = (e) => {
        setSelected(e.target.checked);
        dispatch(makeSelected({ item, selected: e.target.checked }));
    };

    return (
        <CartItemStyled>
            <MyRow style={!selected ? { opacity: 0.4 } : null}>
                <CheckDesktop>
                    <Form.Check type="checkbox" checked={selected} onChange={handleSelect} style={{ width: "20px" }} />
                </CheckDesktop>
                {item.img ? (
                    <ImageDesktop>
                        <img src={item.img} alt={""} width="80" height="80"></img>
                    </ImageDesktop>
                ) : null}
                <MyCol style={{ fontWeight: "500" }} xs={7} sm={8} md={5}>
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
