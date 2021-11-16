import React from "react";
import styled from "@emotion/styled";
import colors from "../settings/colors";
import Item from "./Item";
import { useSelector } from "react-redux";

const SidebarStyled = styled.div((props) => {
    return {
        position: "absolute",
        top: "50px",
        bottom: "0px",
        backgroundColor: colors.greyBackground,
        width: "170px",
        left: props.sideBarOpened ? "0px" : "-170px",
        transition: "left 0.5s",
        overflow: "auto",
    };
});

const Header = styled.div({
    marginTop: "10px",
    textAlign: "center",
    fontSize: "20px",
    fontWeight: "500",
});

const ItemsList = styled.div({
    marginTop: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
});

const items = [
    {
        id: 1,
        name: "Бытовая химия",
        img: "https://smartikon.by/uploads/catalog-001.png",
    },
    {
        id: 2,
        name: "Бумажно-гигиеническая продукция",
        img: "https://smartikon.by/uploads/catalog-002.png",
    },
    {
        id: 3,
        name: "Ведра, корзины, урны",
        img: "https://smartikon.by/uploads/catalog-003.png",
    },
    {
        id: 4,
        name: "Диспенсеры и дозаторы для общественных санузлов",
        img: "https://smartikon.by/uploads/catalog-004.png",
    },
    {
        id: 5,
        name: "Диспенсеры и дозаторы для общественных санузлов",
        img: "https://smartikon.by/uploads/catalog-004.png",
    },
    {
        id: 6,
        name: "Диспенсеры и дозаторы для общественных санузлов",
        img: "https://smartikon.by/uploads/catalog-004.png",
    },
    {
        id: 7,
        name: "Диспенсеры и дозаторы для общественных санузлов",
        img: "https://smartikon.by/uploads/catalog-004.png",
    },
];

function Sidebar() {
    const sideBarOpened = useSelector((state) => state.manage.sideBarOpened);

    return (
        <SidebarStyled sideBarOpened={sideBarOpened}>
            <Header>Каталог</Header>
            <ItemsList>{items ? items.map((item) => <Item key={item.id} item={item} />) : null}</ItemsList>
        </SidebarStyled>
    );
}

export default Sidebar;
