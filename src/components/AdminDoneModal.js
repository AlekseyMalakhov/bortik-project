import React from "react";
import { useSelector } from "react-redux";
import "./additional.css";
import styled from "@emotion/styled";

const MyModal = styled.div({
    position: "fixed",
    top: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "white",
    padding: "20px 20px",
    borderRadius: "8px",
    border: "2px solid #43c766",
    fontWeight: "bold",
});

function AdminDoneModal() {
    const adminDoneModal = useSelector((state) => state.manage.adminDoneModal);
    if (adminDoneModal) {
        return <MyModal>{adminDoneModal}</MyModal>;
    }
    return null;
}
export default AdminDoneModal;
