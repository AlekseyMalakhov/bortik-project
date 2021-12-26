import React from "react";
import styled from "@emotion/styled";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setUser } from "../store/manage";
import { useTranslation } from "react-i18next";

function AccountCreatedModal({ show, onHide, newUser, ...otherProps }) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const close = () => {
        onHide();
        const user = { ...newUser };
        delete user.password;
        delete user.repeatPassword;
        dispatch(setUser(user));
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
    };

    return (
        <React.Fragment>
            {newUser ? (
                <Modal show={show} {...otherProps} size="sm" centered>
                    <Modal.Body>
                        <h5 style={{ textAlign: "center", marginBottom: "15px" }}>{t("Аккаунт создан!")}</h5>
                        <p style={{ marginBottom: "10px" }}>
                            {t("Уважаемый")} {newUser.name}! {t("Ваш аккаунт")} <b>{newUser.email}</b> {t("создан. Для входа используйте")}
                        </p>
                        <p style={{ marginBottom: "5px" }}>
                            {t("Логин")}: {newUser.email}
                        </p>
                        <p style={{ marginBottom: "5px" }}>
                            {t("Пароль")}: {newUser.password}
                        </p>
                    </Modal.Body>
                    <Modal.Footer style={{ display: "flex", justifyContent: "center" }}>
                        <Button onClick={close}>{t("На главную")}</Button>
                    </Modal.Footer>
                </Modal>
            ) : null}
        </React.Fragment>
    );
}

export default AccountCreatedModal;
