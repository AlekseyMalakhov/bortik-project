import React from "react";
import styled from "@emotion/styled";

const CircleCategoryStyled = styled.div({
    height: "14px",
    width: "14px",
    borderRadius: "7px",
    backgroundColor: "yellow",
    position: "absolute",
    top: "5px",
    right: "0px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "10px",
});

function CircleCategory({ numberInCart }) {
    return <CircleCategoryStyled>{numberInCart}</CircleCategoryStyled>;
}

export default CircleCategory;
