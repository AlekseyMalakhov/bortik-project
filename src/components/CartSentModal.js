import React from "react";
import styled from "@emotion/styled";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { cleanCart } from "../store/manage";

const CartSentModalStyled = styled.div({});

function CartSentModal({ onHide, email, showDone, orderID, ...otherProps }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const close = () => {
        onHide();
        dispatch(cleanCart());
        navigate("/");
    };
    return (
        <CartSentModalStyled>
            {showDone === "OK" ? (
                <Modal {...otherProps} size="sm" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Body>
                        <h5 style={{ textAlign: "center" }}>Заказ отправлен!</h5>
                        <p>
                            Номер Вашего заказа <b>{orderID}</b>. Подтверждение заказа отправлено на Ваш email: <b>{email}</b>
                        </p>
                        <p>В ближайшее время с Вами свяжется наш менеджер для уточнения деталей доставки.</p>
                    </Modal.Body>
                    <Modal.Footer style={{ display: "flex", justifyContent: "center" }}>
                        <Button onClick={close}>На главную</Button>
                    </Modal.Footer>
                </Modal>
            ) : null}
            {showDone === "Error" ? (
                <Modal {...otherProps} size="sm" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Body>
                        <h5 style={{ textAlign: "center" }}>Произошла ошибка!</h5>
                        <p>Ваш заказ не отправлен.</p>
                        <p>Обратитесь в службу поддержки или попробуйте позже.</p>
                    </Modal.Body>
                    <Modal.Footer style={{ display: "flex", justifyContent: "center" }}>
                        <Button onClick={() => onHide()}>Закрыть</Button>
                    </Modal.Footer>
                </Modal>
            ) : null}
        </CartSentModalStyled>
    );
}

export default CartSentModal;
