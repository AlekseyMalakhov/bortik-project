import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import AddRemove from "./AddRemove";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector, useDispatch } from "react-redux";
import { changeSideBarOpened } from "../store/manage";
import IconCheck from "./IconCheck";
import ShowPic from "./ShowPic";
import { useTranslation } from "react-i18next";
import itemsAPI from "../api/items";
import { changeAntonAnton } from "../store/manage";
import { setNestedObjectValues } from "formik";







const CardStyled = styled.div(()=>
{
    const antonAnton = useSelector((state) => state.manage.antonAnton)

    
    
    if (antonAnton){
        return{
            
           overflow:"auto",
            width: "100%",
            position: "relative",
            backgroundColor: "white",
            margin: "10px 10px",
            padding: "10px 10px",
            height: "-webkit-fill-available",
            maxWidth: "1000px",
            margin: "5px",
            paddingTop: "6px",
            paddingBottom: "6px",
            paddingRight: "12px",
            /* display: flex; */
            borderRadius: "40px",  
               
        }  
               
    }
    else 
    return{
            // overflow: "auto",
            width: "100%",
            position: "relative",
            backgroundColor: "white",
            margin: "10px 10px",
            padding: "10px 10px",
            height: "-webkit-fill-available",
            maxWidth: "1000px",
            margin: "4px",
            paddingTop: "6px",
            paddingBottom: "6px",
            paddingRight: "12px",
            /* display: flex; */
            borderRadius: "8px",   
    }    
}
    );

const MyCol = styled(Col)(()=>
{

  const antonAnton =  useSelector((state) => state.manage.antonAnton)

    return{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: antonAnton? "23px":"16px",
    padding: "10px 10px",
    textAlign: "center",   
    fonWweight: "500",
    color:"#333333" }
}
    );

const MyRow = styled(Row)`
    height: inherit;
    justify-content: space-evenly;
    align-items: center;
    
`;

// const MyCol = styled(Col)

    
//     `display: flex;
//     justify-content: center;
//     align-items: center;
//     font-size: 14px;
//     padding: 10px 10px;
//     text-align: center;
// `
    
// ;

const Prices = styled(Col)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    padding: 10px 10px;
    text-align: center;
    max-width: 200px;
`;

const RetailPrice = styled.div({
    //backgroundColor: "#69F0AE",
    color: "#0d6efd",
    fontSize: "20px",
    fontWeight: "bold",
    padding: "2px 5px",
    borderRadius: "3px",
});

const Tip = styled.div({
    fontSize: "12px",
});

const ByOrder = styled.div({
    backgroundColor: "#98c9f1",
    fontSize: "14px",
    padding: "0 5px",
});


const toIdAnt =(elem) =>{
    
  
    console.log(elem);
    elem.scrollIntoView({
        // behavior: 'smooth',
        block: 'center',
        inline: 'center'
      });

}

function Card({ item }) {

   // console.log(item.id)


 async function f1(elem){
   
    
    if (antonAnton) {

            //  toIdAnt(elem) почему не работает???

        setTimeout(() => toIdAnt(elem), 0);
        dispatch(changeAntonAnton(false));
        
        
        
    } else {
        if(sideBarOpened){
            
            dispatch(changeAntonAnton(true));
            dispatch(changeSideBarOpened(false));
            setTimeout(() => toIdAnt(elem), 500);
        }
        else {
            dispatch(changeAntonAnton(true));
            setTimeout(() => toIdAnt(elem), 0);
        }
    }
    
 }
    const antoncheg = async () => {
    
      
        
        let elem = document.getElementById(item.id);
        f1(elem);
       
         
        
    };

    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const sideBarOpened = useSelector((state) => state.manage.sideBarOpened);
    const mobileScreen = useSelector((state) => state.manage.mobileScreen);
    const antonAnton = useSelector((state) => state.manage.antonAnton);
    const cart = useSelector((state) => state.manage.cart);
    const priceType = useSelector((state) => state.manage.priceType);
    const [inCart, setInCart] = useState(false);
    const [showImage, setShowImage] = useState(false);

    const [touchStart, setTouchStart] = React.useState(0);
    const [touchEnd, setTouchEnd] = React.useState(0);
    const [swiping, setSwiping] = useState(false);



    

    function handleTouchStart(e) {
        setTouchStart(e.targetTouches[0].clientX);
    }

    function handleTouchMove(e) {
        setSwiping(true);
        setTouchEnd(e.targetTouches[0].clientX);
    }

    function handleTouchEnd() {
        if (touchStart - touchEnd > 70 && swiping) {
            dispatch(changeSideBarOpened(false));
        }

        if (touchStart - touchEnd < -70 && swiping && !antonAnton) {
            dispatch(changeSideBarOpened(true));
        }
        setSwiping(false);
    }

    useEffect(() => {
        if (cart.length > 0) {
            const includedInCart = cart.find((itemInCart) => itemInCart.id === item.id);
            if (includedInCart) {
                setInCart(includedInCart);
            } else {
                setInCart(false);
            }
        } else {
            setInCart(false);
        }
    }, [cart]);

    const handleSelect = (name) => {
        if (mobileScreen) {
            dispatch(changeSideBarOpened(false));
        }
    };

    return (
        <CardStyled 

            id= {item.id}

            onClick={() => handleSelect()}
            onTouchStart={(e) => handleTouchStart(e)}
            onTouchMove={(e) => handleTouchMove(e)}
            onTouchEnd={() => handleTouchEnd()}
            
        >
            {inCart ? <IconCheck /> : null}
            {antonAnton? (
<MyRow>
                {item.img ? (
                    <Col xs="auto" md="6" lg="6">
                        
                        
                            <img                                                      
                            src={item.img}
                             alt={""} 
                             width="100%" 
                             height="100%"
                             onClick={antoncheg}
                             ></img>
                                                     
                        
                     </Col>
                ) : 
                <Col xs="auto" md="6" lg="6">
                    <div onClick={antoncheg} style={{width:"100px", height:"100px",borderStyle: "solid",borderColor: "#0d6efd", margin: "auto",paddingTop: "30px",
                        textAlign: "center", borderRadius: "10px"
                }}>no foto</div>            
                
                </Col>
                


                }
                <MyCol style={{flexDirection: "column"}}>
                <MyCol>

                    <div >
                       
                    {item.title[i18n.resolvedLanguage]}                    
                    <div style={{color:"#828282",paddingTop: "10px",fontSize: "medium",fontWeight: "500"}}>  
                    {item.article}
                    </div></div>

                </MyCol>
                <Prices>
                    {priceType === "с НДС" ? (
                        <div>
                            {/* цнеа в карточках на главной странице */}
                            <RetailPrice>{item.priceIncVAT} BYN</RetailPrice>
                            
                            <Tip>{t("Цена с НДС")}</Tip>
                        </div>
                    ) : null}
                    {priceType === "без НДС" ? (
                        <div>
                            <RetailPrice>{item.priceExcVAT} BYN</RetailPrice>
                            <Tip>{t("Цена без НДС")}</Tip>
                        </div>
                    ) : null}
                    {!item.presence ? <ByOrder>{t("Под заказ")}</ByOrder> : null}
                </Prices>
                {sideBarOpened && mobileScreen ? null : (
                    <Col xs="auto">
                        <AddRemove item={item} inCart={inCart} />
                    </Col>
                )}
                </MyCol>
            </MyRow>):(

                <MyRow >
                {item.img ? (
                    <Col xs="auto" md="auto" lg="auto">
                        
                    
                            <img
                                src={item.img}
                                alt={""}
                                width="100px"
                                height="100px"
                                onClick={antoncheg}
                                style={{ cursor: "pointer" }}
                            ></img>
                        
                    </Col>
                ) : 
                
                <Col xs="auto" md="auto" lg="auto">
                    <div style={{width:"100px", height:"100px", borderStyle: "solid",borderColor: "#0d6efd",paddingTop: "30px",
                        textAlign: "center",borderRadius: "10px"
                }} onClick={antoncheg} >no foto</div>            
                
                </Col>}
                
                <MyCol>

                    <div >
                       
                    {item.title[i18n.resolvedLanguage]}                    
                    <div style={{color:"#828282",paddingTop: "10px",fontSize: "small", fontWeight:"500"}}>  
                    {item.article}
                    </div></div>

                </MyCol>
                <Prices sm={12} md={3}>
                    {priceType === "с НДС" ? (
                        <div>
                            {/* цнеа в карточках на главной странице */}
                            <RetailPrice>{item.priceIncVAT} BYN</RetailPrice>
                            
                            <Tip>{t("Цена с НДС")}</Tip>
                        </div>
                    ) : null}
                    {priceType === "без НДС" ? (
                        <div>
                            <RetailPrice>{item.priceExcVAT} BYN</RetailPrice>
                            <Tip>{t("Цена без НДС")}</Tip>
                        </div>
                    ) : null}
                    {!item.presence ? <ByOrder>{t("Под заказ")}</ByOrder> : null}
                </Prices>
                {sideBarOpened && mobileScreen ? null : (
                    <Col xs="auto">
                        <AddRemove item={item} inCart={inCart} />
                    </Col>
                )}
                
            </MyRow>

            )}
            
            <ShowPic item={showImage} fullscreen={true} onHide={() => setShowImage(false)} />

        </CardStyled>
        
    );


    
}


export default Card;







