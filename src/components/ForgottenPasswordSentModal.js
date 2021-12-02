import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router";

function ForgottenPasswordSentModal({ show, onHide, ...otherProps }) {
    const navigate = useNavigate();

    const close = () => {
        onHide();
        navigate("/");
    };

    return (
        <Modal show={show} {...otherProps} size="sm" centered>
            <Modal.Body>
                <h5 style={{ textAlign: "center", marginBottom: "15px" }}>Пароль восстановлен!</h5>
                <p style={{ marginBottom: "10px" }}>Пароль выслан Вам на email. Проверьте пожалуйста Ваш почтовый ящик.</p>
            </Modal.Body>
            <Modal.Footer style={{ display: "flex", justifyContent: "center" }}>
                <Button onClick={close}>На главную</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ForgottenPasswordSentModal;
