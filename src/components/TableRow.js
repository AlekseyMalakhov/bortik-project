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
            <td>{item.title}</td>
            <td>{item.number}</td>
            <td>{getPrice()}</td>
        </tr>
    );
}

export default TableRow;
