import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import colors from "../settings/colors";
import Item from "./Item";
import { useSelector, useDispatch } from "react-redux";
import SidebarHeader from "./SidebarHeader";
import { changeSideBarOpened } from "../store/manage";

const SidebarStyled = styled.div((props) => {
    return {
        backgroundColor: colors.greyBackground,
        borderRadius:"8px",
        width: "170px",
        minWidth: "170px",
        marginLeft: props.sideBarOpened ? "0px" : "-170px",
        transition: "margin-left 0.5s",
        overflow: "auto",
        overflowX: "hidden",
    };
});

const ItemsList = styled.div({
    margin: "0px 10px",
    marginBottom: "100px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
});

const sortAlphabetically = (arr) => {
    let result = [];
    const sortedArr = [...arr];
    if (sortedArr.length > 0) {
        result = sortedArr.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : b.name.toLowerCase() > a.name.toLowerCase() ? -1 : 0));
    }
    return result;
};

function Sidebar() {
    const dispatch = useDispatch();
    const sideBarOpened = useSelector((state) => state.manage.sideBarOpened);
    const searchInput = useSelector((state) => state.manage.searchInput);
    const search = useSelector((state) => state.manage.search);
    const selectedItems = useSelector((state) => state.manage.selectedItems);
    const items = useSelector((state) => state.manage.items);
    const catalog = useSelector((state) => state.manage.catalog);
    const selectedGroup = useSelector((state) => state.manage.selectedGroup);
    const selectedCategory1 = useSelector((state) => state.manage.selectedCategory1);
    const selectedCategory2 = useSelector((state) => state.manage.selectedCategory2);
    const sideBarShowType = useSelector((state) => state.manage.sideBarShowType);
    const [list, setList] = useState([]);

    const [touchStart, setTouchStart] = React.useState(0);
    const [touchEnd, setTouchEnd] = React.useState(0);
    const [swiping, setSwiping] = useState(false);

    function handleTouchStart(e) {
        setTouchStart(e.targetTouches[0].clientX);
    }

    function handleTouchMove(e) {
        setSwiping(true);
        setTouchEnd(e.targetTouches[0].clientX);
    }

    function handleTouchEnd() {
        if (touchStart - touchEnd > 70 && swiping) {
            dispatch(changeSideBarOpened(false));
            setSwiping(false);
        }
    }

    const handleSearch = (categories) => {
        const result = categories.filter((category) => {
            if (sideBarShowType === "groups") {
                return selectedItems.find((selectedItem) => selectedItem.group === category.name);
            }
            if (sideBarShowType === "categories1") {
                return selectedItems.find((selectedItem) => selectedItem.category1 === category.name);
            }
            if (sideBarShowType === "categories2") {
                return selectedItems.find((selectedItem) => selectedItem.category2 === category.name);
            }
            return false;
        });
        return result;
    };

    useEffect(() => {
        if (items) {
            let selected = [];
            if (sideBarShowType === "groups") {
                selected = catalog;
            }
            if (sideBarShowType === "categories1") {
                const index = catalog.findIndex((gr) => gr.name === selectedGroup);
                selected = catalog[index].items;
            }
            if (sideBarShowType === "categories2") {
                const indexGr = catalog.findIndex((gr) => gr.name === selectedGroup);
                const indexCat1 = catalog[indexGr].items.findIndex((categ1) => categ1.name === selectedCategory1);
                selected = catalog[indexGr].items[indexCat1].items;
            }
            if (search && searchInput.length > 0) {
                selected = handleSearch(selected);
            }
            setList(sortAlphabetically(selected));
        }
    }, [items, catalog, selectedGroup, selectedCategory1, selectedCategory2, sideBarShowType, selectedItems]);

    return (
        <SidebarStyled
            sideBarOpened={sideBarOpened}
            onTouchStart={(e) => handleTouchStart(e)}
            onTouchMove={(e) => handleTouchMove(e)}
            onTouchEnd={() => handleTouchEnd()}
        >
            <SidebarHeader />
            <ItemsList>
                {list.map((category) => (
                    <Item key={category.id} category={category.name} />
                ))}
            </ItemsList>
        </SidebarStyled>
    );
}

export default Sidebar;
