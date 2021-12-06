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
        <tr>
            <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                <img src={item.img} alt="" height="50"></img>
            </td>
            <td style={{ verticalAlign: "middle" }}>{item.title}</td>
            <td style={{ verticalAlign: "middle", textAlign: "center" }}>{item.number}</td>
            <td style={{ verticalAlign: "middle", textAlign: "center" }}>{getPrice()}</td>
        </tr>
    );
}

export default TableRow;
