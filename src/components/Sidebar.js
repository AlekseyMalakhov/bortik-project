import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import colors from "../settings/colors";
import Item from "./Item";
import { useSelector, useDispatch } from "react-redux";
//import { setSelectedCategory } from "../store/manage";

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

    const [groups, setGroups] = useState([]);
    const [categories1, setCategories1] = useState([]);
    const [categories2, setCategories2] = useState([]);

    useEffect(() => {
        console.log(items);
        if (items && items.catalog) {
            const groups = Object.keys(items.catalog);
            setGroups(groups);
            console.log(groups);
        }
    }, [items]);

    return (
        <SidebarStyled sideBarOpened={sideBarOpened}>
            <Header>Каталог</Header>
            <ItemsList>{groups.length > 0 ? groups.map((category) => <Item key={category} category={category} type="group" />) : null}</ItemsList>
        </SidebarStyled>
    );
}

export default Sidebar;
