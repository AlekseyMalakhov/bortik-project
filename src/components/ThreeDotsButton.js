import React from "react";
import styled from "@emotion/styled";

const ThreeDotsButtonStyled = styled.div({
    marginRight: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "42px",
    height: "42px",
    cursor: "pointer",
    "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        borderRadius: "20px",
    },
    "&:after": {
        content: "none",
    },
});

function ThreeDotsButton({ ...props }, ref) {
    return (
        <ThreeDotsButtonStyled {...props} ref={ref}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" viewBox="0 0 16 16">
                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
            </svg>
        </ThreeDotsButtonStyled>
    );
}

export default React.forwardRef(ThreeDotsButton);
