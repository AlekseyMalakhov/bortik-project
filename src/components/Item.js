import React from "react";
import styled from "@emotion/styled";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedCategory } from "../store/manage";

const ItemStyled = styled.div(({ selected }) => {
    return {
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
    const selectedCategory = useSelector((state) => state.manage.selectedCategory);
    return (
        <ItemStyled selected={category.id === selectedCategory} onClick={() => dispatch(setSelectedCategory(category.id))}>
            <Name>{category.name}</Name>
        </ItemStyled>
    );
}

export default Item;
