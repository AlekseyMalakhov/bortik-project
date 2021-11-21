import React from "react";
import styled from "@emotion/styled";
import colors from "../settings/colors";
import Item from "./Item";
import { useSelector } from "react-redux";

const SidebarStyled = styled.div((props) => {
    return {
        //height: "100%",
        //position: "absolute",
        //top: "50px",
        //bottom: props.mobileScreen ? "40px" : "0px",
        backgroundColor: colors.greyBackground,
        width: "170px",
        minWidth: "170px",
        marginLeft: props.sideBarOpened ? "0px" : "-170px",
        //left: props.sideBarOpened ? "0px" : "-170px",
        //width: props.sideBarOpened ? "170px" : "0px",
        transition: "margin-left 0.5s",
        overflow: "auto",
        overflowX: "hidden",
    };
});

const Header = styled.div({
    marginTop: "10px",
    textAlign: "center",
    fontSize: "20px",
    fontWeight: "500",
});

const ItemsList = styled.div({
    margin: "10px 10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
});

function Sidebar() {
    const sideBarOpened = useSelector((state) => state.manage.sideBarOpened);
    const mobileScreen = useSelector((state) => state.manage.mobileScreen);
    const categories = useSelector((state) => state.manage.categories);

    return (
        <SidebarStyled sideBarOpened={sideBarOpened} mobileScreen={mobileScreen}>
            <Header>Каталог</Header>
            <ItemsList>{categories ? categories.map((category) => <Item key={category.id} category={category} />) : null}</ItemsList>
        </SidebarStyled>
    );
}

export default Sidebar;
