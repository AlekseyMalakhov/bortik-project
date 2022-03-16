import React, { useState } from "react";
import styled from "@emotion/styled";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AddRemove from "./AddRemove";
import { useTranslation } from "react-i18next";
import { getPrice } from "../utilities/calculate";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { makeSelected } from "../store/manage";
import ShowPic from "./ShowPic";






const CartItemStyled = styled.div`
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


const Acontainer =styled.div `
    width:100%;
    margin: 4px;
    padding-top: 6px;
    padding-bottom: 6px;
    padding-right: 12px;
    border-radius: 8px;
    background-color:white;
    align-items: flex-end;
  
  `;
  

const BottomCol = styled(Col)({
    fontSize:"13px",
    display: "flex",
    justifyContent: "flex-end",
    color: "crimson",
   
});



const Centr= styled.div`
    margin: auto;
    margin-right: 12px;
    `
    
const Left=styled.div`
      margin: 6px;
    align-self: center;
    `

const Right = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: -webkit-fill-available;
`;

const RightDown = styled.div`
margin-top: 4px;
display: flex;
justify-content: space-between;
flex-flow: row wrap;
align-items: baseline;

`;


// const Coin = styled.div`{
//     order: 999;
//   margin-left: auto;
//   `;

// const Price = styled.div`
//     color: crimson;
//   `;

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
    background:"white",
});

const ByOrder = styled.div({
    backgroundColor: "#98c9f1",
    fontSize: "14px",
    padding: "0 5px",
    width: "fit-content",
    fontWeight: "normal",
});

const ArticleCss = styled.div`
    padding-left: 8px;
    color: rgb(130, 130, 130);
    font-weight: 500;
    font-size: small;
    

`;
function CartItem({ item, priceType }) {

    const [showImage, setShowImage] = useState(false);

    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();

    const handleSelect = (e) => {
        dispatch(makeSelected({ item, selected: e.target.checked }));
    };

    return (
        <CartItemStyled>
            <Acontainer style={!item.selected ? { opacity: 0.4, display:"flex" } : {display:"flex"}}>
           
                <Left>
                        <Form.Check type="checkbox" checked={item.selected} onChange={handleSelect} style={{ width: "20px" }} />
                </Left>
                    <Centr>
                        {item.img ? (
                            <ImageDesktop>
                                <img src={item.img} alt={""} width="90" height="90" onClick={() => setShowImage(item)}></img  >
                            </ImageDesktop>
                        ) : null}
                    </Centr>

                <Right>
                <MyCol style={{ fontWeight: "500", width:"100%", textAlign:"left",color:"#333333"}}>
                   <div>{item.title[i18n.resolvedLanguage]}</div> 
                </MyCol>
                <ArticleCss>{item.article}</ArticleCss> 
                    <RightDown>
                    
                    <BottomCol style={{display:"table-column"}}>
                        <RetailPrice >
                            
                            {getPrice(item, priceType)} BYN
                            {!item.presence ? <ByOrder>{t("Под заказ")}</ByOrder> : null}
                            
                        </RetailPrice>
                    </BottomCol>

                    <BottomCol  >
                        <AddRemove  item={item} inCart={item} type="small" />
                    </BottomCol>

                    </RightDown>
                </Right>
            </Acontainer>

            
            <ShowPic item={showImage} fullscreen={true} onHide={() => setShowImage(false)} />
        </CartItemStyled>
    );
}

export default CartItem;
