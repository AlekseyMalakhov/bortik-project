import React from "react";
import styled from "@emotion/styled";
import Button from "react-bootstrap/Button";

const AddRemoveButtonStyled = styled(Button)(({ type }) => {
    if (type === "small") {
        return {
            width: "27px",
            height: "27px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 0,
            "&:focus": {
                outline: "none",
                boxShadow: "none",
            },
        };
    }

    return {
        width: "36px",
        height: "36px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 0,
        "&:focus": {
            outline: "none",
            boxShadow: "none",
        },
    };
});

function AddRemoveButton({ icon, onClick, type }) {
    if (icon === "plus") {
        return (
            <AddRemoveButtonStyled variant="primary" onClick={onClick} type={type}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                </svg>
            </AddRemoveButtonStyled>
        );
    }
    if (icon === "minus") {
        return (
            <AddRemoveButtonStyled variant="primary" onClick={onClick} type={type}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                </svg>
            </AddRemoveButtonStyled>
        );
    }
}

export default AddRemoveButton;
