import React from "react";
import styled from "@emotion/styled";

const CleanCartButtonStyled = styled.div({
    position: "absolute",
    bottom: "50px",
    right: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "24px",
    height: "24px",
    cursor: "pointer",
    backgroundColor: "#cd41e7",
    borderRadius: "12px",
    "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        borderRadius: "12px",
    },
});

function CleanCartButton({ onClick }) {
    return (
        <CleanCartButtonStyled onClick={onClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
        </CleanCartButtonStyled>
    );
}

export default CleanCartButton;
