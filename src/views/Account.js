import React from "react";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";

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
    const user = useSelector((state) => state.manage.user);
    return (
        <AccountStyled>
            <Title>Личный кабинет</Title>
            {user ? (
                <div>
                    <div>ФИО: {user.name}</div>
                    <div>Email: {user.email}</div>
                    <div>Телефон: {user.phone}</div>
                    <div>Адрес доставки: {user.address}</div>
                </div>
            ) : (
                <div>Ошибка</div>
            )}
        </AccountStyled>
    );
}

export default Account;
