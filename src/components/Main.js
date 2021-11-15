import React from "react";
import styled from "@emotion/styled";
import Card from "./Card";
import colors from "../settings/colors";
import { useSelector } from "react-redux";

function Main({ items }) {
    const sideBarOpened = useSelector((state) => state.manage.sideBarOpened);

    const MainStyled = styled.div({
        position: "absolute",
        top: "50px",
        left: sideBarOpened ? "170px" : "0",
        bottom: "0px",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.lightGreyBackground,
        overflow: "auto",
    });

    return <MainStyled>{items ? items.map((item) => <Card item={item} />) : null}</MainStyled>;
}

export default Main;
