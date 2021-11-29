import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import colors from "../settings/colors";
import Item from "./Item";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedCategory } from "../store/manage";

const SidebarStyled = styled.div((props) => {
    return {
        backgroundColor: colors.greyBackground,
        width: "170px",
        minWidth: "170px",
        marginLeft: props.sideBarOpened ? "0px" : "-170px",
        transition: "margin-left 0.5s",
        overflow: "auto",
        overflowX: "hidden",
    };
});

const Header = styled.div({
    marginTop: "10px",
    textAlign: "center",
    fontSize: "20px",
    fontWeight: "500",
});

const ItemsList = styled.div({
    margin: "10px 10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
});

function Sidebar() {
    const dispatch = useDispatch();
    const sideBarOpened = useSelector((state) => state.manage.sideBarOpened);
    const categories = useSelector((state) => state.manage.categories);
    const searchInput = useSelector((state) => state.manage.searchInput);
    const search = useSelector((state) => state.manage.search);
    const items = useSelector((state) => state.manage.items);
    const selectedCategory = useSelector((state) => state.manage.selectedCategory);

    const [searchedCategories, setSearchedCategories] = useState(null);

    useEffect(() => {
        if (search && searchInput) {
            const str = searchInput.toLowerCase();
            const arr = categories.filter((category) => items[category.name].find((item) => item.title.toLowerCase().includes(str)));
            setSearchedCategories(arr);
            const selectedCat = arr.find((category) => category.name === selectedCategory);
            if (!selectedCat && arr.length > 0) {
                dispatch(setSelectedCategory(arr[0].name));
            }
        } else {
            setSearchedCategories(categories);
        }
    }, [categories, search, searchInput]);

    return (
        <SidebarStyled sideBarOpened={sideBarOpened}>
            <Header>Каталог</Header>
            <ItemsList>{searchedCategories ? searchedCategories.map((category) => <Item key={category.id} category={category} />) : null}</ItemsList>
        </SidebarStyled>
    );
}

export default Sidebar;
