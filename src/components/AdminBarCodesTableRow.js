import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import ThreeDotsButtonAdmin from "./ThreeDotsButtonAdmin";
import AdminEditCartItemModal from "./AdminEditCartItemModal";
import AdminDeleteSoldItemModal from "./AdminDeleteSoldItemModal";
import AdminDeleteOrderModal from "./AdminDeleteOrderModal";
import { createDate } from "../utilities/calculate";
import AdminEditOrderModal from "./AdminEditOrderModal";
import AdminAddCartItemModal from "./AdminAddCartItemModal";
import AdminDeleteBarcodeModal from "./AdminDeleteBarcodeModal";

function AdminBarCodesTableRow({ barcode }) {
    const [showEdit, setShowEdit] = useState(false);
    const [showItemAdd, setShowItemAdd] = useState(false);
    const [showItemDelete, setShowItemDelete] = useState(false);
    const [showBarcodeDelete, setShowBarcodeDelete] = useState(false);
    const [itemToEdit, setItemToEdit] = useState(null);
    const [showOrderEdit, setShowOrderEdit] = useState(false);

    const edit = (item) => {
        setItemToEdit(item);
        setShowEdit(true);
    };

    const deleteItem = (item) => {
        setItemToEdit(item);
        setShowItemDelete(true);
    };

    const deleteBarcode = () => {
        setShowBarcodeDelete(true);
    };

    const editOrder = () => {
        setShowOrderEdit(true);
    };

    const addItem = () => {
        setShowItemAdd(true);
    };

    const getStatus = () => {
        // if (order.status === "in progress") {
        //     return "В работе";
        // }
        // if (order.status === "finished") {
        //     return "Выдан";
        // }
        return null;
    };

    const cancel = () => {
        setShowBarcodeDelete(false);
    };

    return (
        <React.Fragment>
            <tr style={{ backgroundColor: "#f5f5f5" }}>
                <td>{barcode.article}</td>
                <td>{barcode.barcode}</td>
                <td style={{ verticalAlign: "middle" }}>
                    <Dropdown align="start" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Dropdown.Toggle as={ThreeDotsButtonAdmin} />
                        <Dropdown.Menu style={{ width: "160px" }}>
                            <Dropdown.Item onClick={() => edit(barcode)}>Редактировать</Dropdown.Item>
                            <Dropdown.Item onClick={() => deleteBarcode(barcode)}>Удалить штрихкод</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </td>
            </tr>
            <AdminDeleteBarcodeModal show={showBarcodeDelete} onHide={cancel} barcode={barcode} />

            {/* <AdminEditCartItemModal show={showEdit} onHide={cancel} order={order} item={itemToEdit} />
            <AdminAddCartItemModal show={showItemAdd} onHide={cancel} order={order} />
            <AdminDeleteSoldItemModal show={showItemDelete} onHide={cancel} order={order} item={itemToEdit} />
            <AdminDeleteOrderModal show={showOrderDelete} onHide={cancel} order={order} />
            <AdminEditOrderModal show={showOrderEdit} onHide={cancel} order={order} /> */}
        </React.Fragment>
    );
}

export default AdminBarCodesTableRow;
