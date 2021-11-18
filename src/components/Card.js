import React from "react";
import styled from "@emotion/styled";
import AddRemove from "./AddRemove";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const CardStyled = styled(Container)`
    background-color: white;
    margin: 10px 10px;
    padding: 10px 10px;
    max-width: 1200px;
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
    min-width: 250px;
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

const RetailPrice = styled.div({
    backgroundColor: "#69F0AE",
    padding: "2px 5px",
    borderRadius: "3px",
});

const Tip = styled.div({
    fontSize: "12px",
});

function Card({ item }) {
    return (
        <CardStyled>
            <MyRow>
                {item.img ? (
                    <Col xs="auto">
                        <img src={item.img} alt={item.title} width="100" height="100"></img>
                    </Col>
                ) : null}
                <MyCol style={{ fontWeight: "500" }}>{item.title}</MyCol>
                <Prices>
                    <RetailPrice>Цена с НДС {item.price} руб</RetailPrice>
                    <div>Цена без НДС {item.priceopt} руб</div>
                    <div>
                        <div>Цена без НДС {item.pricemegaopt} руб*</div>
                        <Tip>*(при общей сумме заказа от 250 руб)</Tip>
                    </div>
                </Prices>
                <MyCol xs="auto">
                    <AddRemove />
                </MyCol>
            </MyRow>
        </CardStyled>
    );
}

export default Card;
