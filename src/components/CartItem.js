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
import "../App.css";

const CartItemStyled = styled(Container)`
    margin: 4px;
    padding-top: 0px;
    padding-left: 0px;
    padding-bottom: 0px;
    padding-right: 0px;
    display: flex;
    border-radius: 8px;
    background-color:#f5f5f6;
    flex-direction: row;

`;

const BottomCol = styled(Col)({
    fontSize:"13px",
    display: "flex",
    justifyContent: "center",
    color: "crimson",
   
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
    padding: 0px 0px;
    text-align: center;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

`;

const RetailPrice = styled.div({
    fontSize: "13px",
    fontWeight: "500",
    padding: "2px 5px",
    borderRadius: "3px",
    justifyContent:"left",
    marginLeft:"2px",
});

const ByOrder = styled.div({
    backgroundColor: "#98c9f1",
    fontSize: "14px",
    padding: "0 5px",
    width: "fit-content",
    fontWeight: "normal",
});

function CartItem({ item, priceType }) {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();

    const handleSelect = (e) => {
        dispatch(makeSelected({ item, selected: e.target.checked }));
    };

    return (
        <CartItemStyled>
            <div class="container" style={!item.selected ? { opacity: 0.4, display:"flex" } : {display:"flex"}}>
           
            <div class="left">
                    <Form.Check type="checkbox" checked={item.selected} onChange={handleSelect} style={{ width: "20px" }} />
            </div>
                 <div class="centr">
                    {item.img ? (
                        <ImageDesktop>
                            <img src={item.img} alt={""} width="90" height="90"></img>
                        </ImageDesktop>
                    ) : null}
                </div>

                <div class="right">
                <MyCol style={{ fontWeight: "500", width:"100%", textAlign:"left",color:"#333333"}}>
                    {item.title[i18n.resolvedLanguage]}
                </MyCol>
                <div class="right_down">
                
                <BottomCol style={{display:"table-column"}}>
                    <RetailPrice >
                        {getPrice(item, priceType)} BYN
                        {!item.presence ? <ByOrder>{t("Под заказ")}</ByOrder> : null}
                    </RetailPrice>
                </BottomCol>

                <BottomCol  >
                    <AddRemove  item={item} inCart={item} type="small" />
                </BottomCol>

                </div>
                </div>
            </div>

            
            
        </CartItemStyled>
    );
}

export default CartItem;
