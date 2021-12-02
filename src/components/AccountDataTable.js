import React from "react";
import styled from "@emotion/styled";
import Table from "react-bootstrap/Table";

const AccountDataTableStyled = styled.div({
    width: "100%",
    maxWidth: "700px",
});

function AccountDataTable({ user }) {
    return (
        <AccountDataTableStyled>
            <Table striped bordered hover>
                <tbody>
                    <tr>
                        <td>ФИО</td>
                        <td>{user.name}</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>{user.email}</td>
                    </tr>
                    <tr>
                        <td>Телефон</td>
                        <td>{user.phone}</td>
                    </tr>
                    <tr>
                        <td>Адрес доставки</td>
                        <td>{user.address}</td>
                    </tr>
                </tbody>
            </Table>
        </AccountDataTableStyled>
    );
}

export default AccountDataTable;

{
    /* <div>ФИО: {user.name}</div>
                    <div>Email: {user.email}</div>
                    <div>Телефон: {user.phone}</div>
                    <div>Адрес доставки: {user.address}</div> */
}
