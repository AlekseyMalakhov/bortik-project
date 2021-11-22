import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedCategory, changeSideBarOpened } from "../store/manage";
import CircleCategory from "./CircleCategory";

const ItemStyled = styled.div(({ selected }) => {
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
    };
});

const Name = styled.div({
    textAlign: "center",
    fontSize: "14px",
    fontWeight: "500",
});

function Item({ category }) {
    const dispatch = useDispatch();
    const mobileScreen = useSelector((state) => state.manage.mobileScreen);
    const selectedCategory = useSelector((state) => state.manage.selectedCategory);
    const cart = useSelector((state) => state.manage.cart);

    const [numberInCart, setNumberInCart] = useState(0);

    useEffect(() => {
        const arr = cart.filter((item) => item.category === category.name);
        setNumberInCart(arr.length);
    }, [cart]);

    const handleSelect = (name) => {
        dispatch(setSelectedCategory(name));
        if (mobileScreen) {
            //dispatch(changeSideBarOpened(false));
        }
    };

    return (
        <ItemStyled selected={category.name === selectedCategory} onClick={() => handleSelect(category.name)}>
            <Name>{category.name}</Name>
            {numberInCart > 0 ? <CircleCategory numberInCart={numberInCart} /> : null}
        </ItemStyled>
    );
}

export default Item;
