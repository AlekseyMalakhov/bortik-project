import React from "react";
import styled from "@emotion/styled";
import "./lang.css";

function SelectLangText({ ...props }, ref) {
    return (
        <div {...props} ref={ref}>
            Select lang
        </div>
    );
}

export default React.forwardRef(SelectLangText);
