import React from "react";
import styled from "@emotion/styled";

function HistoryTableRow({ item }) {
    return (
        <tr>
            <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                <img src={item.img} alt="" height="50"></img>
            </td>
            <td style={{ verticalAlign: "middle" }}>{item.title}</td>
            <td style={{ verticalAlign: "middle", textAlign: "center" }}>{item.number}</td>
            <td style={{ verticalAlign: "middle", textAlign: "center" }}>{item.price}</td>
        </tr>
    );
}

export default HistoryTableRow;