import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function AdminEditCartItemModal({ show, onHide, onSave, order, ...otherProps }) {
    return (
        <Modal show={show} {...otherProps} size="sm" centered onHide={onHide} size="lg">
            <Modal.Body style={{ display: "flex", justifyContent: "center" }}>
                <p>Редактирование товара для заказа №{order.id}</p>
            </Modal.Body>
            <Modal.Footer style={{ display: "flex", justifyContent: "space-evenly" }}>
                <Button onClick={onHide} variant="outline-primary" style={{ width: "110px" }}>
                    Отмена
                </Button>
                <Button onClick={onSave} style={{ width: "110px" }}>
                    Сохранить
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
export default AdminEditCartItemModal;
