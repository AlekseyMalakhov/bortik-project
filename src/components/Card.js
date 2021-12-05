import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import AddRemove from "./AddRemove";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector, useDispatch } from "react-redux";
import { changeSideBarOpened } from "../store/manage";
import IconCheck from "./IconCheck";
import ShowPic from "./ShowPic";

const CardStyled = styled(Container)`
    position: relative;
    background-color: white;
    margin: 10px 10px;
    padding: 10px 10px;
    max-width: 1210px;
`;

const MyRow = styled(Row)`
    justify-content: center;
    align-items: center;
`;

const MyCol = styled(Col)`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    padding: 10px 10px;
    text-align: center;
`;

const Prices = styled(Col)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    padding: 10px 10px;
    text-align: center;
    min-width: 250px;
`;

const MyColAddRemove = styled.div(({ sideBarOpened, mobileScreen }) => {
    return {
        display: sideBarOpened && mobileScreen ? "none" : "flex",
        justifyContent: "center",
    };
});

const RetailPrice = styled.div({
    //backgroundColor: "#69F0AE",
    fontWeight: "500",
    padding: "2px 5px",
    borderRadius: "3px",
});

const Tip = styled.div({
    fontSize: "12px",
});

function Card({ item }) {
    const dispatch = useDispatch();
    const sideBarOpened = useSelector((state) => state.manage.sideBarOpened);
    const mobileScreen = useSelector((state) => state.manage.mobileScreen);
    const cart = useSelector((state) => state.manage.cart);
    const priceType = useSelector((state) => state.manage.priceType);

    const [inCart, setInCart] = useState(false);
    const [showImage, setShowImage] = useState(false);

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
        <CardStyled onClick={() => handleSelect()}>
            {inCart ? <IconCheck /> : null}
            <MyRow>
                {item.img ? (
                    <Col xs="auto">
                        {sideBarOpened && mobileScreen ? (
                            <img src={item.img} alt={""} width="100" height="100"></img>
                        ) : (
                            <img
                                src={item.img}
                                alt={""}
                                width="100"
                                height="100"
                                onClick={() => setShowImage(item)}
                                style={{ cursor: "pointer" }}
                            ></img>
                        )}
                    </Col>
                ) : null}
                <MyCol style={{ fontWeight: "500" }} xs={12} sm={12} md={5}>
                    {item.title}
                </MyCol>
                <Prices sm={12} md={3}>
                    {priceType === "с НДС" ? <RetailPrice>Цена с НДС {item.price} руб</RetailPrice> : null}
                    {priceType === "без НДС" ? <RetailPrice>Цена без НДС {item.priceopt} руб</RetailPrice> : null}
                    {priceType === "без НДС (от 250р)" ? (
                        <div>
                            <RetailPrice>Цена без НДС {item.pricemegaopt} руб</RetailPrice>
                            <Tip>*(при общей сумме заказа от 250 руб)</Tip>
                        </div>
                    ) : null}
                </Prices>
                <Col xs="auto" sm={2}>
                    <MyColAddRemove sideBarOpened={sideBarOpened} mobileScreen={mobileScreen}>
                        <AddRemove item={item} inCart={inCart} />
                    </MyColAddRemove>
                </Col>
            </MyRow>

            <ShowPic item={showImage} fullscreen={true} onHide={() => setShowImage(false)} />
        </CardStyled>
    );
}

export default Card;
