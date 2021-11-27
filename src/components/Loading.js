import React from "react";
import styled from "@emotion/styled";
import loadingSVG from "../assets/loading.svg";

const LoadingStyled = styled.div({
    position: "fixed",
    top: "0px",
    bottom: "0px",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
});

function Loading() {
    console.log(window.innerHeight);
    return (
        <LoadingStyled>
            <img src={loadingSVG} alt="loading" width="80px" height="80px" />
        </LoadingStyled>
    );
}

export default Loading;
