import React from "react";
import styled from "@emotion/styled";

const MenuButtonStyled = styled.div({
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

function MenuButton({ onClick }) {
    return (
        <MenuButtonStyled onClick={onClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 16 16">
                <path
                    fillRule="evenodd"
                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                />
            </svg>
        </MenuButtonStyled>
    );
}

export default MenuButton;
