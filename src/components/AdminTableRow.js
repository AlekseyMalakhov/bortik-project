import React from "react";

function AdminTableRow({ item, priceType }) {
    return (
        <tr>
            <td>{item.title}</td>
            <td>{item.number}</td>
            <td>{item.price}</td>
        </tr>
    );
}

export default AdminTableRow;
