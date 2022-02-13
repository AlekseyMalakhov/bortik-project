import React from "react";
import styled from "@emotion/styled";
import AdminHeader from "./AdminHeader";
import AdminOrdersTable from "./AdminOrdersTable";

const AdminPanelStyled = styled.div({});

function AdminPanel() {
    const cart = [
        {
            id: 1,
            title: "sdfsd",
            number: 324234,
            price: 6455,
        },
    ];
    return (
        <AdminPanelStyled>
            <AdminHeader />
            <AdminOrdersTable cart={cart} />
        </AdminPanelStyled>
    );
}

export default AdminPanel;
