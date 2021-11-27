import React from "react";
import styled from "@emotion/styled";

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
    return (
        <LoadingStyled>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{ margin: "auto", background: "rgba(0, 0, 0, 0) none repeat scroll 0% 0%", display: "block", shapeRendering: "auto" }}
                width="80px"
                height="80px"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid"
            >
                <circle cx="50" cy="50" fill="none" stroke="#3be8b0" strokeWidth="10" r="35" strokeDasharray="164.93361431346415 56.97787143782138">
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        repeatCount="indefinite"
                        dur="1s"
                        values="0 50 50;360 50 50"
                        keyTimes="0;1"
                    ></animateTransform>
                </circle>
            </svg>
        </LoadingStyled>
    );
}

export default Loading;
