import React from "react";
import styled from "@emotion/styled";

const SidebarExitButtonStyled = styled.div({
    marginLeft: "10px",
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
});

function SidebarExitButton({ onClick }) {
    return (
        <SidebarExitButtonStyled onClick={onClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#3d5afe" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
        </SidebarExitButtonStyled>
    );
}

export default SidebarExitButton;
