import React from "react";
import styled from "@emotion/styled";
import "./lang.css";
import SelectLangIcon from "./SelectLangIcon";

function SelectLangText({ ...props }, ref) {
    return (
        <div {...props} ref={ref}>
            <SelectLangIcon />
            Lang
        </div>
    );
}

export default React.forwardRef(SelectLangText);
