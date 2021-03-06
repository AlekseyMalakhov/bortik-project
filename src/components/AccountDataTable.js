import React from "react";
import styled from "@emotion/styled";
import Table from "react-bootstrap/Table";
import { useTranslation } from "react-i18next";

const AccountDataTableStyled = styled.div({
    width: "100%",
    maxWidth: "700px",
    paddingLeft: "10px",
    paddingRight: "10px",
});

function AccountDataTable({ user }) {
    const { t } = useTranslation();
    return (
        <AccountDataTableStyled>
            <Table striped bordered hover>
                <tbody>
                    <tr>
                        <td>{t("ФИО")}</td>
                        <td>{user.name}</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>{user.email}</td>
                    </tr>
                    <tr>
                        <td>{t("Телефон")}</td>
                        <td>{user.phone}</td>
                    </tr>
                    {user && user.address ? (
                        user.address.map((address, index) => (
                            <tr key={address.id}>
                                <td>{t("Адрес доставки") + " " + (index + 1)}</td>
                                <td>{address.name}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td>{t("Адрес доставки")}</td>
                            <td></td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </AccountDataTableStyled>
    );
}

export default AccountDataTable;
