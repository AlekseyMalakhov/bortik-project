import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import adminAPI from "../api/admin";
import { setLoading, getAdminOrders } from "../store/manage";
import { useDispatch } from "react-redux";
import { showAdminDoneModal } from "../utilities/helpers";

function AdminDeleteOrderModal({ show, onHide, order, ...otherProps }) {
    const dispatch = useDispatch();
    const handleDelete = () => {
        adminAPI
            .deleteOrder(order.id)
            .then((response) => {
                dispatch(setLoading(false));
                dispatch(getAdminOrders());
                if (response.status === 200) {
                    showAdminDoneModal("Заказ №" + order.id + " успешно удален!");
                } else {
                    showAdminDoneModal("Неизвестная ошибка! Обратитесь к администратору или попробуйте позже.");
                }
                onHide();
            })
            .catch((err) => {
                dispatch(setLoading(false));
                console.log(err);
            });
    };

    return (
        <Modal show={show} {...otherProps} size="sm" centered onHide={onHide}>
            <Modal.Body style={{ display: "flex", justifyContent: "center" }}>
                {order ? (
                    <p>
                        Удалить заказ <span style={{ fontWeight: "bold" }}>№{order.id}?</span>
                    </p>
                ) : null}
            </Modal.Body>
            <Modal.Footer style={{ display: "flex", justifyContent: "space-evenly" }}>
                <Button onClick={onHide} variant="outline-primary">
                    Отмена
                </Button>
                <Button onClick={handleDelete} style={{ width: "81px" }}>
                    Да
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AdminDeleteOrderModal;
