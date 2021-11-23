import React from "react";
import styled from "@emotion/styled";
import colors from "../settings/colors";
import MenuButton from "./MenuButton";
import { useLocation } from "react-router";
import HeaderBackButton from "./HeaderBackButton";

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

function Header() {
    let location = useLocation();

    return (
        <HeaderStyled>
            {location.pathname === "/" ? <MenuButton /> : <HeaderBackButton />}
            <BrandName>Bortik Project</BrandName>
        </HeaderStyled>
    );
}

export default Header;
