import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import AdminHeader from "./AdminHeader";
import AdminOrdersTable from "./AdminOrdersTable";
import { useDispatch, useSelector } from "react-redux";
import { getAdminOrders } from "../store/manage";

const AdminPanelStyled = styled.div({});

function AdminPanel() {
    const orders = useSelector((state) => state.manage.adminOrders);
    const dispatch = useDispatch();

    useEffect(() => {
        if (orders.length === 0) {
            dispatch(getAdminOrders());
        }
    }, []);

    return (
        <AdminPanelStyled>
            <AdminHeader />
            <AdminOrdersTable orders={orders} />
        </AdminPanelStyled>
    );
}

export default AdminPanel;
