import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import AdminHeader from "./AdminHeader";
import { useDispatch, useSelector } from "react-redux";
import { getAdminOrders, getBarcodes } from "../store/manage";
import AdminDoneModal from "./AdminDoneModal";
import { Outlet } from "react-router-dom";

const AdminPanelStyled = styled.div({});

function AdminPanel() {
    const orders = useSelector((state) => state.manage.adminOrders);
    const barcodes = useSelector((state) => state.manage.barcodes);
    const dispatch = useDispatch();

    useEffect(() => {
        if (orders.length === 0) {
            dispatch(getAdminOrders());
        }
        if (barcodes.length === 0) {
            dispatch(getBarcodes());
        }
    }, []);

    return (
        <AdminPanelStyled>
            <AdminHeader />
            <Outlet />
            <AdminDoneModal />
        </AdminPanelStyled>
    );
}

export default AdminPanel;
