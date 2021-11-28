import React from "react";
import styled from "@emotion/styled";
import Modal from "react-bootstrap/Modal";

const ShowPicStyled = styled.div({});

function ShowPic({ item, fullscreen, onHide }) {
    return (
        <ShowPicStyled>
            <Modal show={item} fullscreen={fullscreen} onHide={onHide}>
                <Modal.Header closeButton>
                    <h6>{item.title}</h6>
                </Modal.Header>
                <Modal.Body>
                    <img src={item.img} alt={""} style={{ maxWidth: "100%", height: "auto" }}></img>
                </Modal.Body>
            </Modal>
        </ShowPicStyled>
    );
}

export default ShowPic;
