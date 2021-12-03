import React from "react";
import styled from "@emotion/styled";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setUser } from "../store/manage";

function AccountEditedModal({ show, onHide, newUser, ...otherProps }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const close = () => {
        onHide();
        // const user = { ...newUser };
        // delete user.password;
        // delete user.repeatPassword;
        // dispatch(setUser(user));
        // localStorage.setItem("user", JSON.stringify(user));
        // navigate("/");
    };

    return (
        <React.Fragment>
            {newUser ? (
                <Modal show={show} {...otherProps} size="sm" centered>
                    <Modal.Body>
                        <div style={{ marginBottom: "10px", textAlign: "center" }}>Аккаунт отредактирован успешно!</div>
                    </Modal.Body>
                    <Modal.Footer style={{ display: "flex", justifyContent: "center" }}>
                        <Button onClick={close}>На главную</Button>
                    </Modal.Footer>
                </Modal>
            ) : null}
        </React.Fragment>
    );
}

export default AccountEditedModal;
