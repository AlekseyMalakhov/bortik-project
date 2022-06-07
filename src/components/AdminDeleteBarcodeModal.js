import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import adminAPI from "../api/admin";
import { setLoading, getBarcodes } from "../store/manage";
import { useDispatch, useSelector } from "react-redux";
import { showAdminDoneModal } from "../utilities/helpers";

function AdminDeleteBarcodeModal({ show, onHide, barcode, ...otherProps }) {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.manage.loading);
    const handleDelete = () => {
        dispatch(setLoading(true));
        adminAPI
            .deleteBarcode(barcode.id)
            .then((response) => {
                dispatch(setLoading(false));
                dispatch(getBarcodes());
                if (response.status === 200) {
                    showAdminDoneModal("Штрихкод для товара с артикулом " + barcode.article + " успешно удален!");
                } else {
                    showAdminDoneModal("Неизвестная ошибка! Обратитесь к администратору или попробуйте позже.");
                }
                onHide();
            })
            .catch((err) => {
                dispatch(setLoading(false));
                showAdminDoneModal("Неизвестная ошибка! Обратитесь к администратору или попробуйте позже.");
                console.log(err);
            });
    };

    return (
        <Modal show={show} {...otherProps} size="sm" centered onHide={onHide}>
            <Modal.Body style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ textAlign: "center" }}>
                    Удалить штрихкод для товара артикул <span style={{ fontWeight: "bold" }}>{barcode.article}?</span>
                </div>
            </Modal.Body>
            <Modal.Footer style={{ display: "flex", justifyContent: "space-evenly" }}>
                <Button onClick={onHide} variant="outline-primary" disabled={loading}>
                    Отмена
                </Button>
                <Button onClick={handleDelete} style={{ width: "81px" }} disabled={loading}>
                    Да
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AdminDeleteBarcodeModal;
