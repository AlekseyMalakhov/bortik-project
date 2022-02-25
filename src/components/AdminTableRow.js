import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import ThreeDotsButtonAdmin from "./ThreeDotsButtonAdmin";

function AdminTableRow({ order }) {
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
                                <Dropdown.Item>Редактировать</Dropdown.Item>
                                <Dropdown.Item>Удалить</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </td>
                </tr>
            ))}
        </React.Fragment>
    );
}

export default AdminTableRow;
