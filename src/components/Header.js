import React from "react";
import styled from "@emotion/styled";
import colors from "../settings/colors";
import MenuButton from "./MenuButton";
import { useLocation } from "react-router";
import HeaderBackButton from "./HeaderBackButton";
import Dropdown from "react-bootstrap/Dropdown";
import ThreeDotsButton from "./ThreeDotsButton";

const HeaderStyled = styled.div({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.primaryColor,
    height: "50px",
});

const BrandName = styled.div({
    color: "white",
    //marginRight: "20px",
    fontSize: "20px",
});

function Header() {
    let location = useLocation();

    return (
        <HeaderStyled>
            {location.pathname === "/" ? <MenuButton /> : <HeaderBackButton />}
            <BrandName>Bortik Project</BrandName>
            <Dropdown align="end">
                <Dropdown.Toggle as={ThreeDotsButton} id="dropdown-basic" />
                <Dropdown.Menu>
                    <Dropdown.Item>Поиск</Dropdown.Item>
                    <Dropdown.Item>Личный кабинет</Dropdown.Item>
                    <Dropdown.Item>О компании</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </HeaderStyled>
    );
}

export default Header;
