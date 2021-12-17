import React from "react";
import { useTranslation } from "react-i18next";

function TableRow({ item, priceType }) {
    const { t, i18n } = useTranslation();
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
            <td style={{ verticalAlign: "middle", borderBottomStyle: "none" }}>{item.title[i18n.resolvedLanguage]}</td>
            <td style={{ verticalAlign: "middle", textAlign: "center", borderBottomStyle: "none" }}>{item.number}</td>
            <td style={{ verticalAlign: "middle", textAlign: "center", borderBottomStyle: "none" }}>{getPrice()}</td>
        </tr>
    );
}

export default TableRow;
