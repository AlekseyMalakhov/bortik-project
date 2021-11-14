import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import colors from "../settings/colors";

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
    return (
        <HeaderStyled>
            <MenuButton></MenuButton>
            <BrandName>Bortik Project</BrandName>
        </HeaderStyled>
    );
}

export default Header;
