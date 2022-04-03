import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import ThreeDotsButtonAdmin from "./ThreeDotsButtonAdmin";
import AdminEditCartItemModal from "./AdminEditCartItemModal";
import AdminDeleteSoldItemModal from "./AdminDeleteSoldItemModal";
import AdminDeleteOrderModal from "./AdminDeleteOrderModal";
import { createDate } from "../utilities/calculate";
import AdminEditOrderModal from "./AdminEditOrderModal";

function AdminTableRow({ order }) {
    const [showEdit, setShowEdit] = useState(false);
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

    const cancel = () => {
        setShowEdit(false);
        setShowItemDelete(false);
        setShowOrderDelete(false);
        setItemToEdit(null);
        setShowOrderEdit(false);
    };

    return (
        <React.Fragment>
            <tr style={{ backgroundColor: "#f5f5f5" }}>
                <td colSpan={6} style={{ fontWeight: "bold", paddingTop: "20px", paddingBottom: "20px" }}>
                    <div style={{ display: "flex" }}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            Заказ №{order.id}
                            <span style={{ fontWeight: "normal" }}>{createDate(Number(order.date))}</span>
                        </div>
                        {order.customer ? (
                            <div style={{ display: "flex" }}>
                                <div style={{ display: "flex", flexDirection: "column", fontWeight: "normal", marginLeft: "100px" }}>
                                    <span style={{ fontWeight: "bold" }}>Покупатель: {order.customer.name}</span>
                                    <span>email: {order.customer.email}</span>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", fontWeight: "normal", marginLeft: "100px" }}>
                                    <span style={{ fontWeight: "bold" }}>Телефон: {order.customer.phone}</span>
                                    <span>Адрес доставки: {order.address}</span>
                                </div>
                            </div>
                        ) : (
                            <div style={{ display: "flex", fontWeight: "bold", marginLeft: "100px" }}>Информация о покупателе отсутствует</div>
                        )}
                    </div>
                </td>
                <td style={{ verticalAlign: "middle" }}>
                    <Dropdown align="start" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Dropdown.Toggle as={ThreeDotsButtonAdmin} />
                        <Dropdown.Menu style={{ width: "160px" }}>
                            <Dropdown.Item onClick={() => editOrder()}>Редактировать</Dropdown.Item>
                            <Dropdown.Item>Добавить товар</Dropdown.Item>
                            <Dropdown.Item onClick={() => deleteOrder()}>Удалить заказ</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </td>
            </tr>
            {order.items.length > 0 ? (
                order.items.map((item, index) => (
                    <tr
                        key={item.id}
                        style={
                            index === order.items.length - 1
                                ? {
                                      borderBottomWidth: "3px",
                                  }
                                : null
                        }
                    >
                        <td></td>
                        <td></td>
                        <td>{item.article}</td>
                        <td>{item.title}</td>
                        <td>{item.number}</td>
                        <td>{item.price_for_manager}</td>
                        <td style={{ verticalAlign: "middle" }}>
                            <Dropdown align="start" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Dropdown.Toggle as={ThreeDotsButtonAdmin} />
                                <Dropdown.Menu style={{ width: "160px" }}>
                                    <Dropdown.Item onClick={() => edit(item)}>Редактировать</Dropdown.Item>
                                    <Dropdown.Item onClick={() => deleteItem(item)}>Удалить товар</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={7} style={{ textAlign: "center" }}>
                        В заказе отсутствуют купленные товары!
                    </td>
                </tr>
            )}
            <AdminEditCartItemModal show={showEdit} onHide={cancel} order={order} item={itemToEdit} />
            <AdminDeleteSoldItemModal show={showItemDelete} onHide={cancel} order={order} item={itemToEdit} />
            <AdminDeleteOrderModal show={showOrderDelete} onHide={cancel} order={order} />
            <AdminEditOrderModal show={showOrderEdit} onHide={cancel} order={order} />
        </React.Fragment>
    );
}

export default AdminTableRow;
