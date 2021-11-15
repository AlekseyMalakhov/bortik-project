import React from "react";
import styled from "@emotion/styled";

const MainStyled = styled.div({
    position: "absolute",
    top: "50px",
    left: "170px",
    bottom: "0px",
    display: "flex",
    flexWrap: "wrap",
});

function Main({ items }) {
    return <MainStyled>{items ? items.map((item) => <div>{item.name}</div>) : null}</MainStyled>;
}

export default Main;
