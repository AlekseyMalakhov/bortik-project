import React from "react";
import styled from "@emotion/styled";

const ItemStyled = styled.div({
    padding: "15px 10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        borderRadius: "5px",
    },
});

const Name = styled.div({
    textAlign: "center",
    fontSize: "14px",
    fontWeight: "500",
});

function Item({ item }) {
    return (
        <ItemStyled>
            <div>
                <img src={item.img} alt={item.name} width="100" height="100"></img>
            </div>
            <Name>{item.name}</Name>
        </ItemStyled>
    );
}

export default Item;
