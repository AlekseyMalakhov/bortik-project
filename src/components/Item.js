import React from "react";
import styled from "@emotion/styled";

const ItemStyled = styled.div({
    width: "100%",
    padding: "10px 10px",
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

function Item({ category }) {
    return (
        <ItemStyled>
            <Name>{category.name}</Name>
        </ItemStyled>
    );
}

export default Item;
