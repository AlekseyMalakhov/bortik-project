import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import AccountDataTable from "../components/AccountDataTable";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router";
import HistoryTable from "../components/HistoryTable";
import { useTranslation } from "react-i18next";
import colors from "../settings/colors";

const AccountStyled = styled.div({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: colors.lightGreyBackground,
    
});

const Title = styled.div({
    textAlign: "center",
    margin: "20px 10px",
    fontSize: "20px",
    fontWeight: "500",
});

function Account() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const user = useSelector((state) => state.manage.user);
    const history = useSelector((state) => state.manage.history);

    const [sortedHistory, setSortedHistory] = useState([]);

    useEffect(() => {
        if (history.length > 0) {
            const arr = [...history];
            const result = arr.sort((a, b) => (a.id < b.id ? 1 : b.id < a.id ? -1 : 0)); //descending order
            setSortedHistory(result);
        }
    }, [history]);

    const edit = () => {
        navigate("/edit_account");
    };
    return (
        <AccountStyled>
            <Title>{t("Личный кабинет")}</Title>
            {user ? <AccountDataTable user={user} /> : <div>{t("Ошибка")}</div>}
            <Button variant="primary" onClick={edit} style={{ marginTop: "20px", marginBottom: "20px" }}>
                {t("Редактировать личные данные")}
            </Button>
            <Title>{t("История покупок")}</Title>
            {sortedHistory.length > 0 ? <HistoryTable history={sortedHistory} /> : "Ваша история покупок пуста"}
        </AccountStyled>
    );
}

export default Account;
