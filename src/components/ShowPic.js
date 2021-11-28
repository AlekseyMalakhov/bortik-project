import React from "react";
import styled from "@emotion/styled";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ShowPicStyled = styled.div({});

function ShowPic({ show, fullscreen, onHide }) {
    return (
        <ShowPicStyled>
            <Modal show={show} fullscreen={fullscreen} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={"https://smartikon.by/uploads/SMART.14003.webp"} alt={""} style={{ maxWidth: "100%", height: "auto" }}></img>
                </Modal.Body>
            </Modal>
        </ShowPicStyled>
    );
}

export default ShowPic;
