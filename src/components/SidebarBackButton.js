import React from "react";
import styled from "@emotion/styled";

const SidebarBackButtonStyled = styled.div({
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

function SidebarBackButton({ onClick }) {
    return (
        <SidebarBackButtonStyled onClick={onClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#3d5afe" viewBox="0 0 16 16">
                <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
            </svg>
        </SidebarBackButtonStyled>
    );
}

export default SidebarBackButton;
