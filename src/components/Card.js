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
    max-width: 800px;
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

function Card({ item }) {
    return (
        <CardStyled>
            <MyRow>
                <Col xs="auto">
                    <img src={item.img} alt={item.name} width="100" height="100"></img>
                </Col>
                <MyCol>{item.name}</MyCol>
                <MyCol xs="auto">
                    <AddRemove />
                </MyCol>
            </MyRow>
        </CardStyled>
    );
}

export default Card;
