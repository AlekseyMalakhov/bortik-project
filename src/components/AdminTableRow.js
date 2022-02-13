import React from "react";

function AdminTableRow({ order }) {
    return (
        <React.Fragment>
            <tr>
                <td colSpan={3} style={{ fontWeight: "bold" }}>
                    Заказ №{order.id}
                </td>
            </tr>
            {order.items.map((item) => (
                <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>{item.number}</td>
                    <td>{item.price}</td>
                </tr>
            ))}
        </React.Fragment>
    );
}

export default AdminTableRow;
