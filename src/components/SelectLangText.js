import React from "react";
import styled from "@emotion/styled";
import "./lang.css";
import SelectLangIcon from "./SelectLangIcon";
import { useTranslation } from "react-i18next";

function SelectLangText({ ...props }, ref) {
    const { i18n } = useTranslation();
    return (
        <div {...props} ref={ref}>
            <div style={{ display: "flex", alignItems: "center" }}>
                <SelectLangIcon />
                Lang
            </div>

            <div style={{ textTransform: "uppercase", marginRight: "20px", fontWeight: "500" }}>{i18n.resolvedLanguage}</div>
        </div>
    );
}

export default React.forwardRef(SelectLangText);
