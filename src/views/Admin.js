import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import AdminLogin from "../components/AdminLogin";
import AdminPanel from "../components/AdminPanel";
import { useSelector, useDispatch } from "react-redux";
import { setAdmin } from "../store/manage";

const AdminStyled = styled.div({});

function Admin() {
    const dispatch = useDispatch();
    const admin = useSelector((state) => state.manage.admin);

    useEffect(() => {
        if (!admin) {
            const adminStr = localStorage.getItem("admin");
            if (adminStr) {
                dispatch(setAdmin(JSON.parse(adminStr)));
            }
        }
    }, []);
    return <AdminStyled>{admin ? <AdminPanel /> : <AdminLogin />}</AdminStyled>;
}

export default Admin;
