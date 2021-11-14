import React from "react";
import styled from "@emotion/styled";
import colors from "../settings/colors";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { changeSideBarOpened } from "../store/manage";

const HeaderStyled = styled.div({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.primaryColor,
    height: "50px",
});

const BrandName = styled.div({
    color: "white",
    marginRight: "20px",
    fontSize: "20px",
});

const MenuButton = styled.div({
    backgroundColor: "white",
    height: "20px",
    width: "20px",
    marginLeft: "20px",
});

function Header() {
    const dispatch = useDispatch();
    const sideBarOpened = useSelector((state) => state.manage.sideBarOpened);

    const toggleSidebar = () => {
        if (sideBarOpened) {
            dispatch(changeSideBarOpened(false));
        } else {
            dispatch(changeSideBarOpened(true));
        }
    };

    return (
        <HeaderStyled>
            <MenuButton onClick={toggleSidebar}></MenuButton>
            <BrandName>Bortik Project</BrandName>
        </HeaderStyled>
    );
}

export default Header;
