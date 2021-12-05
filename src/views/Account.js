import React from "react";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import AccountDataTable from "../components/AccountDataTable";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router";
import HistoryTable from "../components/HistoryTable";

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
    const navigate = useNavigate();
    const user = useSelector((state) => state.manage.user);
    const history = useSelector((state) => state.manage.history);

    const edit = () => {
        navigate("/edit_account");
    };
    return (
        <AccountStyled>
            <Title>Личный кабинет</Title>
            {user ? <AccountDataTable user={user} /> : <div>Ошибка</div>}
            <Button variant="primary" onClick={edit} style={{ marginTop: "20px", marginBottom: "20px" }}>
                Редактировать личные данные
            </Button>
            <Title>История покупок</Title>
            {history.length > 0 ? <HistoryTable history={history} /> : null}
        </AccountStyled>
    );
}

export default Account;
