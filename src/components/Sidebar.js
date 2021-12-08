import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import colors from "../settings/colors";
import Item from "./Item";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedCategory1, setSelectedCategory2, setSelectedGroup } from "../store/manage";
import SidebarBackButton from "./SidebarBackButton";

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
    const catalog = useSelector((state) => state.manage.catalog);
    const selectedGroup = useSelector((state) => state.manage.selectedGroup);
    const selectedCategory1 = useSelector((state) => state.manage.selectedCategory1);
    const selectedCategory2 = useSelector((state) => state.manage.selectedCategory2);

    const [searchedCategories, setSearchedCategories] = useState(null);

    const [list, setList] = useState([]);
    const [showType, setShowType] = useState("groups");

    useEffect(() => {
        if (items) {
            if (!selectedGroup && !selectedCategory1 && !selectedCategory2) {
                setShowType("groups");
                setList(catalog);
                return;
            }
            if (selectedGroup && !selectedCategory1 && !selectedCategory2) {
                const index = catalog.findIndex((gr) => gr.name === selectedGroup);
                setShowType("categories1");
                setList(catalog[index].items);
                return;
            }
            if (selectedGroup && selectedCategory1 && !selectedCategory2) {
                const indexGr = catalog.findIndex((gr) => gr.name === selectedGroup);
                const indexCat1 = catalog[indexGr].items.findIndex((categ1) => categ1.name === selectedCategory1);
                setShowType("categories2");
                setList(catalog[indexGr].items[indexCat1].items);
                return;
            }
        }
    }, [items, catalog, selectedGroup, selectedCategory1, selectedCategory2]);

    const goUp = () => {
        if (showType === "categories2") {
            setShowType("categories1");
            dispatch(setSelectedCategory1(null));
            dispatch(setSelectedCategory2(null));
        }
        if (showType === "categories1") {
            setShowType("groups");
            dispatch(setSelectedGroup(null));
        }
    };

    return (
        <SidebarStyled sideBarOpened={sideBarOpened}>
            <Header>{showType === "groups" ? "Каталог" : <SidebarBackButton onClick={goUp} />}</Header>
            <ItemsList>
                {list.map((category) => (
                    <Item key={category.id} category={category.name} showType={showType} />
                ))}
            </ItemsList>
        </SidebarStyled>
    );
}

export default Sidebar;
