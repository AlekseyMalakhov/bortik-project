import React from "react";
import { useTranslation } from "react-i18next";
import { getPrice } from "../utilities/calculate";

function TableRow({ item, priceType }) {
    const { t, i18n } = useTranslation();

    return (
        <tr style={{ borderBottomStyle: "none" }}>
            <td style={{ textAlign: "center", verticalAlign: "middle", borderBottomStyle: "none" }}>
                <img src={item.img} alt="" height="60"></img>
            </td>
            <td style={{ verticalAlign: "middle", borderBottomStyle: "none" }}>{item.title[i18n.resolvedLanguage]}</td>
            <td style={{ verticalAlign: "middle", textAlign: "center", borderBottomStyle: "none" }}>{item.number}</td>
            <td style={{ verticalAlign: "middle", textAlign: "center", borderBottomStyle: "none" }}>{getPrice(item, priceType)}</td>
        </tr>
    );
}

export default TableRow;
