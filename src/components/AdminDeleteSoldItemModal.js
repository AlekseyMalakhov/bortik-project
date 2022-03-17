import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function AdminDeleteSoldItemModal({ show, onHide, order, item, ...otherProps }) {
    const handleDelete = () => {
        console.log("delete");
    };

    return (
        <Modal show={show} {...otherProps} size="sm" centered onHide={onHide}>
            <Modal.Body style={{ display: "flex", justifyContent: "center" }}>
                {item ? (
                    <p>
                        Удалить товар <span style={{ fontWeight: "bold" }}>{item.title}</span> из заказа{" "}
                        <span style={{ fontWeight: "bold" }}>№{order.id}?</span>
                    </p>
                ) : null}
            </Modal.Body>
            <Modal.Footer style={{ display: "flex", justifyContent: "space-evenly" }}>
                <Button onClick={onHide} variant="outline-primary">
                    Отмена
                </Button>
                <Button onClick={handleDelete} style={{ width: "81px" }}>
                    Да
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AdminDeleteSoldItemModal;
