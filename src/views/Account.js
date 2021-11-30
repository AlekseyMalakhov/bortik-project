import React from "react";
import styled from "@emotion/styled";

const AccountStyled = styled.div({
    margin: "10px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
});

const Title = styled.div({
    textAlign: "center",
    margin: "20px 10px",
    fontSize: "20px",
    fontWeight: "500",
});

function Account() {
    return (
        <AccountStyled>
            <Title>Личный кабинет</Title>
        </AccountStyled>
    );
}

export default Account;
