import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import AdminHeader from "./AdminHeader";
import AdminOrdersTable from "./AdminOrdersTable";
import adminAPI from "../api/admin";
import { useDispatch } from "react-redux";
import { setLoading } from "../store/manage";

const AdminPanelStyled = styled.div({});

function AdminPanel() {
    const [orders, setOrders] = useState([]);
    const dispatch = useDispatch();

    const getOrders = () => {
        adminAPI
            .getOrders()
            .then((response) => {
                dispatch(setLoading(false));
                console.log(response.data);
                setOrders(response.data);
            })
            .catch((err) => {
                dispatch(setLoading(false));
                console.log(err);
            });
    };

    useEffect(() => {
        if (orders.length === 0) {
            getOrders();
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
