import React from "react";
import styled from "@emotion/styled";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setUser } from "../store/manage";
import { useTranslation } from "react-i18next";

function AccountEditedModal({ show, onHide, updatedUser, ...otherProps }) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const close = () => {
        onHide();
        dispatch(setUser(updatedUser));
        localStorage.setItem("user", JSON.stringify(updatedUser));
        navigate("/account");
    };

    return (
        <React.Fragment>
            {updatedUser ? (
                <Modal show={show} {...otherProps} size="sm" centered>
                    <Modal.Body>
                        <div style={{ marginBottom: "10px", textAlign: "center" }}>{t("Аккаунт успешно отредактирован!")}</div>
                    </Modal.Body>
                    <Modal.Footer style={{ display: "flex", justifyContent: "center" }}>
                        <Button onClick={close} style={{ width: "80px" }}>
                            OK
                        </Button>
                    </Modal.Footer>
                </Modal>
            ) : null}
        </React.Fragment>
    );
}

export default AccountEditedModal;
