import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function AskCleanCartModal({ show, onHide, onClean, ...otherProps }) {
    return (
        <Modal show={show} {...otherProps} size="sm" centered onHide={onHide}>
            <Modal.Body style={{ display: "flex", justifyContent: "center" }}>
                <p>Очистить корзину?</p>
            </Modal.Body>
            <Modal.Footer style={{ display: "flex", justifyContent: "space-evenly" }}>
                <Button onClick={onHide} variant="outline-primary">
                    Отмена
                </Button>
                <Button onClick={onClean} style={{ width: "81px" }}>
                    Да
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AskCleanCartModal;
