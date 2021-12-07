import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedGroup, setSelectedCategory1, setSelectedCategory2 } from "../store/manage";
import CircleCategory from "./CircleCategory";

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

function Item({ category, type }) {
    const dispatch = useDispatch();
    const mobileScreen = useSelector((state) => state.manage.mobileScreen);
    const selectedGroup = useSelector((state) => state.manage.selectedGroup);
    const cart = useSelector((state) => state.manage.cart);
    const items = useSelector((state) => state.manage.items);

    const [numberInCart, setNumberInCart] = useState(0);

    useEffect(() => {
        const arr = cart.filter((item) => item.category === category.name);
        setNumberInCart(arr.length);
    }, [cart]);

    const handleSelect = (name) => {
        if (type === "group") {
            dispatch(setSelectedGroup(name));
        }
        if (type === "category1") {
            dispatch(setSelectedCategory1(name));
        }
    };

    return (
        <ItemStyled selected={category === selectedGroup} onClick={() => handleSelect(category)}>
            <Name>{category}</Name>
            {numberInCart > 0 ? <CircleCategory numberInCart={numberInCart} /> : null}
        </ItemStyled>
    );
}

export default Item;
