import React from "react";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";

function AdminDoneModal() {
    const adminDoneModal = useSelector((state) => state.manage.adminDoneModal);
    return (
        <Modal show={adminDoneModal} size="sm" backdropClassName>
            <Modal.Body style={{ display: "flex", justifyContent: "center" }}>{adminDoneModal}</Modal.Body>
        </Modal>
    );
}
export default AdminDoneModal;
