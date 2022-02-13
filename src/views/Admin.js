import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import AdminLogin from "../components/AdminLogin";
import AdminPanel from "../components/AdminPanel";

const AdminStyled = styled.div({});

function Admin() {
    const [admin, setAdmin] = useState(null);

    useEffect(() => {
        const adminStr = localStorage.getItem("admin");
        setAdmin(JSON.parse(adminStr));
    }, []);
    return <AdminStyled>{admin ? <AdminPanel /> : <AdminLogin />}</AdminStyled>;
}

export default Admin;
