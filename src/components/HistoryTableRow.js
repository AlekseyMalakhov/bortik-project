import React from "react";
import styled from "@emotion/styled";

function HistoryTableRow({ item }) {
    return (
        <tr>
            <td style={{ textAlign: "center", verticalAlign: "middle", borderBottomStyle: "none" }}>
                <img src={item.img} alt="" height="60"></img>
            </td>
            <td style={{ verticalAlign: "middle", borderBottomStyle: "none" }}>{item.title}</td>
            <td style={{ verticalAlign: "middle", textAlign: "center", borderBottomStyle: "none" }}>{item.number}</td>
            <td style={{ verticalAlign: "middle", textAlign: "center", borderBottomStyle: "none" }}>{item.price}</td>
        </tr>
    );
}

export default HistoryTableRow;
