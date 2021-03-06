import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedCategory1, setSelectedCategory2, setSelectedGroup, changeSideBarShowType } from "../store/manage";
import CircleCategory from "./CircleCategory";
import { useTranslation } from "react-i18next";

const ItemStyled = styled.div(({ selected, empty }) => {
    return {
        position: "relative",
        width: "100%",
        padding: "10px 10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        backgroundColor: selected ? "rgba(0, 0, 0, 0.2)" : "",
        borderRadius: selected ? "5px" : "",
        "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            borderRadius: "5px",
        },
        color: empty ? "grey" : "rgb(33, 37, 41)",
    };
});

const Name = styled.div({
    textAlign: "center",
    fontSize: "14px",
    fontWeight: "500",
});

function Item({ category }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const mobileScreen = useSelector((state) => state.manage.mobileScreen);
    const selectedGroup = useSelector((state) => state.manage.selectedGroup);
    const selectedCategory1 = useSelector((state) => state.manage.selectedCategory1);
    const selectedCategory2 = useSelector((state) => state.manage.selectedCategory2);
    const cart = useSelector((state) => state.manage.cart);
    const items = useSelector((state) => state.manage.items);
    const sideBarShowType = useSelector((state) => state.manage.sideBarShowType);

    const [numberInCart, setNumberInCart] = useState(0);

    useEffect(() => {
        let arr = [];
        if (sideBarShowType === "groups") {
            arr = cart.filter((item) => item.group === category);
        }
        if (sideBarShowType === "categories1") {
            arr = cart.filter((item) => item.category1 === category);
        }
        if (sideBarShowType === "categories2") {
            arr = cart.filter((item) => item.category2 === category);
        }
        setNumberInCart(arr.length);
    }, [cart, sideBarShowType]);

    const handleSelect = (name) => {
        if (sideBarShowType === "groups") {
            dispatch(setSelectedGroup(name));
            dispatch(changeSideBarShowType("categories1"));
        }
        if (sideBarShowType === "categories1") {
            dispatch(setSelectedCategory1(name));
            dispatch(changeSideBarShowType("categories2"));
        }
        if (sideBarShowType === "categories2") {
            dispatch(setSelectedCategory2(name));
        }
    };

    return (
        <ItemStyled
            selected={sideBarShowType === "categories2" && selectedCategory2 === category}
            onClick={() => handleSelect(category)}
            //empty={items[category].length === 0}
        >
            <Name>{t(category)}</Name>
            {numberInCart > 0 ? <CircleCategory numberInCart={numberInCart} /> : null}
        </ItemStyled>
    );
}

export default Item;
