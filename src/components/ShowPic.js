import React from "react";
import Modal from "react-bootstrap/Modal";

function ShowPic({ item, fullscreen, onHide }) {
    return (
        <Modal show={item} fullscreen={fullscreen} onHide={onHide}>
            <Modal.Header closeButton>
                <h6>{item.title}</h6>
            </Modal.Header>
            <Modal.Body>
                <img src={item.img} alt={""} style={{ maxWidth: "100%", height: "auto" }}></img>
            </Modal.Body>
        </Modal>
    );
}

export default ShowPic;
