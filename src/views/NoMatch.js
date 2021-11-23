import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const NoMatchStyled = styled.div({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: "20px",
    marginTop: "30px",
});

function NoMatch() {
    return (
        <NoMatchStyled>
            Ай ай ай! Нет такого пути!
            <Link to="/"> На главную</Link>
        </NoMatchStyled>
    );
}

export default NoMatch;
