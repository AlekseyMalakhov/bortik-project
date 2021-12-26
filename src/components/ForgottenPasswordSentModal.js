import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

function ForgottenPasswordSentModal({ show, onHide, ...otherProps }) {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const close = () => {
        onHide();
        navigate("/");
    };

    return (
        <Modal show={show} {...otherProps} size="sm" centered>
            <Modal.Body>
                <h5 style={{ textAlign: "center", marginBottom: "15px" }}>{t("Пароль восстановлен!")}</h5>
                <p style={{ marginBottom: "10px" }}>{t("Пароль выслан Вам на email. Проверьте пожалуйста Ваш почтовый ящик.")}</p>
            </Modal.Body>
            <Modal.Footer style={{ display: "flex", justifyContent: "center" }}>
                <Button onClick={close}>{t("На главную")}</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ForgottenPasswordSentModal;
