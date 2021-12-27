import React from "react";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";

function ShowPic({ item, fullscreen, onHide }) {
    const { i18n } = useTranslation();
    if (item) {
        return (
            <Modal show={item} fullscreen={fullscreen} onHide={onHide}>
                <Modal.Header closeButton>
                    <h6>{item.title[i18n.resolvedLanguage]}</h6>
                </Modal.Header>
                <Modal.Body>
                    <img src={item.img} alt={""} style={{ maxWidth: "100%", height: "auto" }}></img>
                </Modal.Body>
            </Modal>
        );
    }
    return null;
}

export default ShowPic;
