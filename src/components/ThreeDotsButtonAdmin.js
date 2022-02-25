import React from "react";
import styled from "@emotion/styled";

const ThreeDotsButtonStyled = styled.div({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "30px",
    height: "30px",
    cursor: "pointer",
    "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        borderRadius: "20px",
    },
    "&:after": {
        content: "none",
    },
});

function ThreeDotsButtonAdmin({ ...props }, ref) {
    return (
        <ThreeDotsButtonStyled {...props} ref={ref}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" viewBox="0 0 16 16">
                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
            </svg>
        </ThreeDotsButtonStyled>
    );
}

export default React.forwardRef(ThreeDotsButtonAdmin);
