import React from "react";
import styled from "@emotion/styled";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setUser } from "../store/manage";

function AccountCreatedModal({ show, onHide, newUser, ...otherProps }) {
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
                        <h5 style={{ textAlign: "center", marginBottom: "15px" }}>Аккаунт создан!</h5>
                        <p style={{ marginBottom: "10px" }}>
                            Уважаемый {newUser.name}! Ваш аккаунт <b>{newUser.email}</b> создан. Для входа используйте:
                        </p>
                        <p style={{ marginBottom: "5px" }}>Логин: {newUser.email}</p>
                        <p style={{ marginBottom: "5px" }}>Пароль: {newUser.password}</p>
                    </Modal.Body>
                    <Modal.Footer style={{ display: "flex", justifyContent: "center" }}>
                        <Button onClick={close}>На главную</Button>
                    </Modal.Footer>
                </Modal>
            ) : null}
        </React.Fragment>
    );
}

export default AccountCreatedModal;
