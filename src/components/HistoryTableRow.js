import React from "react";
import styled from "@emotion/styled";

function HistoryTableRow({ item }) {
    return (
        <tr>
            <td>{item.title}</td>
            <td>{item.number}</td>
            <td>{item.price}</td>
        </tr>
    );
}

export default HistoryTableRow;
