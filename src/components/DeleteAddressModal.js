import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";

function DeleteAddressModal({ show, onHide, onClean, indexToDelete, ...otherProps }) {
    const { t } = useTranslation();
    return (
        <Modal show={show} {...otherProps} size="sm" centered onHide={onHide}>
            <Modal.Body style={{ display: "flex", justifyContent: "center" }}>
                <p>{t("Удалить адрес ") + (indexToDelete + 1) + "?"}</p>
            </Modal.Body>
            <Modal.Footer style={{ display: "flex", justifyContent: "space-evenly" }}>
                <Button onClick={onHide} variant="outline-primary">
                    {t("Отмена")}
                </Button>
                <Button onClick={onClean} style={{ width: "81px" }}>
                    {t("Да")}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DeleteAddressModal;
