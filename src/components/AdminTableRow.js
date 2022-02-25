import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import ThreeDotsButtonAdmin from "./ThreeDotsButtonAdmin";
import AdminEditCartItemModal from "./AdminEditCartItemModal";

function AdminTableRow({ order }) {
    const [showEdit, setShowEdit] = useState(false);

    const handleSave = () => {
        console.log("saved");
    };

    return (
        <React.Fragment>
            <tr style={{ backgroundColor: "#f5f5f5" }}>
                <td colSpan={6} style={{ fontWeight: "bold" }}>
                    Заказ №{order.id}
                </td>
                <td style={{ verticalAlign: "middle" }}>
                    <Dropdown align="start" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Dropdown.Toggle as={ThreeDotsButtonAdmin} />
                        <Dropdown.Menu style={{ width: "160px" }}>
                            <Dropdown.Item>Редактировать</Dropdown.Item>
                            <Dropdown.Item>Удалить</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </td>
            </tr>
            {order.items.map((item) => (
                <tr key={item.id}>
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
                                <Dropdown.Item onClick={() => setShowEdit(true)}>Редактировать</Dropdown.Item>
                                <Dropdown.Item>Удалить</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </td>
                </tr>
            ))}
            <AdminEditCartItemModal show={showEdit} onHide={() => setShowEdit(false)} onSave={handleSave} order={order} />
        </React.Fragment>
    );
}

export default AdminTableRow;
