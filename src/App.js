import React from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";

const AppStyled = styled.div({
    height: "100%",
});

const items = [
    {
        id: 1,
        name: "Концентрированное универсальное чистящее средство Эльф 1 л",
        img: "https://smartikon.by/uploads/SMART.01019.webp",
        priceRetail: "4.87",
        priceWholesaleVATon: "4.06",
        priceWholesaleVAToff: "3.9",
    },
    {
        id: 2,
        name: "Концентрированное универсальное чистящее средство Эльф 1 л",
        img: "https://smartikon.by/uploads/SMART.01019.webp",
        priceRetail: "4.87",
        priceWholesaleVATon: "4.06",
        priceWholesaleVAToff: "3.9",
    },
    {
        id: 3,
        name: "Концентрированное универсальное чистящее средство Эльф 1 л",
        img: "https://smartikon.by/uploads/SMART.01019.webp",
        priceRetail: "4.87",
        priceWholesaleVATon: "4.06",
        priceWholesaleVAToff: "3.9",
    },
    {
        id: 4,
        name: "Концентрированное универсальное чистящее средство Эльф 1 л",
        img: "https://smartikon.by/uploads/SMART.01019.webp",
        priceRetail: "4.87",
        priceWholesaleVATon: "4.06",
        priceWholesaleVAToff: "3.9",
    },
    {
        id: 5,
        name: "Концентрированное универсальное чистящее средство Эльф 1 л",
        img: "https://smartikon.by/uploads/SMART.01019.webp",
        priceRetail: "4.87",
        priceWholesaleVATon: "4.06",
        priceWholesaleVAToff: "3.9",
    },
    {
        id: 6,
        name: "Концентрированное универсальное чистящее средство Эльф 1 л",
        img: "https://smartikon.by/uploads/SMART.01019.webp",
        priceRetail: "4.87",
        priceWholesaleVATon: "4.06",
        priceWholesaleVAToff: "3.9",
    },
    {
        id: 7,
        name: "Концентрированное универсальное чистящее средство Эльф 1 л",
        img: "https://smartikon.by/uploads/SMART.01019.webp",
        priceRetail: "4.87",
        priceWholesaleVATon: "4.06",
        priceWholesaleVAToff: "3.9",
    },
    {
        id: 8,
        name: "Концентрированное универсальное чистящее средство Эльф 1 л",
        img: "https://smartikon.by/uploads/SMART.01019.webp",
        priceRetail: "4.87",
        priceWholesaleVATon: "4.06",
        priceWholesaleVAToff: "3.9",
    },
    {
        id: 9,
        name: "Концентрированное универсальное чистящее средство Эльф 1 л",
        img: "https://smartikon.by/uploads/SMART.01019.webp",
        priceRetail: "4.87",
        priceWholesaleVATon: "4.06",
        priceWholesaleVAToff: "3.9",
    },
    {
        id: 10,
        name: "Концентрированное универсальное чистящее средство Эльф 1 л",
        img: "https://smartikon.by/uploads/SMART.01019.webp",
        priceRetail: "4.87",
        priceWholesaleVATon: "4.06",
        priceWholesaleVAToff: "3.9",
    },
    {
        id: 11,
        name: "Концентрированное универсальное чистящее средство Эльф 1 л",
        img: "https://smartikon.by/uploads/SMART.01019.webp",
        priceRetail: "4.87",
        priceWholesaleVATon: "4.06",
        priceWholesaleVAToff: "3.9",
    },
    {
        id: 12,
        name: "Концентрированное универсальное чистящее средство Эльф 1 л",
        img: "https://smartikon.by/uploads/SMART.01019.webp",
        priceRetail: "4.87",
        priceWholesaleVATon: "4.06",
        priceWholesaleVAToff: "3.9",
    },
];

function App() {
    const sideBarOpened = useSelector((state) => state.manage.sideBarOpened);

    return (
        <AppStyled>
            <Header />
            {sideBarOpened ? <Sidebar /> : null}
            <Main items={items} />
        </AppStyled>
    );
}

export default App;
