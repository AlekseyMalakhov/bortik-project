import React from "react";
import styled from "@emotion/styled";
import AddRemove from "./AddRemove";

const CardStyled = styled.div({
    display: "flex",
    alignItems: "center",
    backgroundColor: "white",
    margin: "10px 10px",
    padding: "10px 10px",
    "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.1)",
    },
});

const Name = styled.div({
    display: "flex",
    alignItems: "center",
    margin: "10px 10px",
});

function Card({ item }) {
    return (
        <CardStyled>
            <img src={item.img} alt={item.name} width="100" height="100"></img>
            <Name>{item.name}</Name>
            <AddRemove />
        </CardStyled>
    );
}

export default Card;
