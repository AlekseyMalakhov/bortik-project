import React from "react";

function TableRow({ item, priceType }) {
    const getPrice = () => {
        if (priceType === "с НДС") {
            return item.price;
        }
        if (priceType === "без НДС") {
            return item.priceopt;
        }
        if (priceType === "без НДС (от 250р)") {
            return item.pricemegaopt;
        }
    };

    return (
        <tr style={{ borderBottomStyle: "none" }}>
            <td style={{ textAlign: "center", verticalAlign: "middle", borderBottomStyle: "none" }}>
                <img src={item.img} alt="" height="60"></img>
            </td>
            <td style={{ verticalAlign: "middle", borderBottomStyle: "none" }}>{item.title}</td>
            <td style={{ verticalAlign: "middle", textAlign: "center", borderBottomStyle: "none" }}>{item.number}</td>
            <td style={{ verticalAlign: "middle", textAlign: "center", borderBottomStyle: "none" }}>{getPrice()}</td>
        </tr>
    );
}

export default TableRow;
