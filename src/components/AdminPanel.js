import React from "react";
import styled from "@emotion/styled";
import AdminHeader from "./AdminHeader";

const AdminPanelStyled = styled.div({});

function AdminPanel() {
    return (
        <AdminPanelStyled>
            <AdminHeader />
            Admin panel
        </AdminPanelStyled>
    );
}

export default AdminPanel;
