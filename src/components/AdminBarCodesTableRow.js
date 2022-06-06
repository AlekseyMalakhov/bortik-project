import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import ThreeDotsButtonAdmin from "./ThreeDotsButtonAdmin";
import AdminEditCartItemModal from "./AdminEditCartItemModal";
import AdminDeleteSoldItemModal from "./AdminDeleteSoldItemModal";
import AdminDeleteOrderModal from "./AdminDeleteOrderModal";
import { createDate } from "../utilities/calculate";
import AdminEditOrderModal from "./AdminEditOrderModal";
import AdminAddCartItemModal from "./AdminAddCartItemModal";

function AdminBarCodesTableRow({ order }) {
    const [showEdit, setShowEdit] = useState(false);
    const [showItemAdd, setShowItemAdd] = useState(false);
    const [showItemDelete, setShowItemDelete] = useState(false);
    const [showOrderDelete, setShowOrderDelete] = useState(false);
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

    const deleteOrder = () => {
        setShowOrderDelete(true);
    };

    const editOrder = () => {
        setShowOrderEdit(true);
    };

    const addItem = () => {
        setShowItemAdd(true);
    };

    const getStatus = () => {
        if (order.status === "in progress") {
            return "В работе";
        }
        if (order.status === "finished") {
            return "Выдан";
        }
        return null;
    };

    const cancel = () => {
        setShowEdit(false);
        setShowItemDelete(false);
        setShowOrderDelete(false);
        setItemToEdit(null);
        setShowOrderEdit(false);
        setShowItemAdd(false);
    };

    return (
        <React.Fragment>
            <tr style={{ backgroundColor: "#f5f5f5" }}>
                <td>{order.id}</td>
                <td>{order.date}</td>
                <td style={{ verticalAlign: "middle" }}>
                    <Dropdown align="start" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Dropdown.Toggle as={ThreeDotsButtonAdmin} />
                        <Dropdown.Menu style={{ width: "160px" }}>
                            <Dropdown.Item onClick={() => edit(order)}>Редактировать</Dropdown.Item>
                            <Dropdown.Item onClick={() => deleteItem(order)}>Удалить штрихкод</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </td>
            </tr>
            <AdminEditCartItemModal show={showEdit} onHide={cancel} order={order} item={itemToEdit} />
            <AdminAddCartItemModal show={showItemAdd} onHide={cancel} order={order} />
            <AdminDeleteSoldItemModal show={showItemDelete} onHide={cancel} order={order} item={itemToEdit} />
            <AdminDeleteOrderModal show={showOrderDelete} onHide={cancel} order={order} />
            <AdminEditOrderModal show={showOrderEdit} onHide={cancel} order={order} />
        </React.Fragment>
    );
}

export default AdminBarCodesTableRow;
