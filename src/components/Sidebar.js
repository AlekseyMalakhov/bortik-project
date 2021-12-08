import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import colors from "../settings/colors";
import Item from "./Item";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedCategory1, setSelectedCategory2, setSelectedGroup } from "../store/manage";
import SidebarHeader from "./SidebarHeader";

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

const ItemsList = styled.div({
    margin: "10px 10px",
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

    const items = useSelector((state) => state.manage.items);
    const catalog = useSelector((state) => state.manage.catalog);
    const selectedGroup = useSelector((state) => state.manage.selectedGroup);
    const selectedCategory1 = useSelector((state) => state.manage.selectedCategory1);
    const selectedCategory2 = useSelector((state) => state.manage.selectedCategory2);

    const sideBarShowType = useSelector((state) => state.manage.sideBarShowType);

    const [searchedCategories, setSearchedCategories] = useState(null);

    const [list, setList] = useState([]);

    // useEffect(() => {
    //     if (search && searchInput.length > 0) {
    //         const arr = categories.filter((category) => {
    //             return items[category.name].find((item) => {
    //                 for (let i = 0; i < searchInput.length; i++) {
    //                     if (item.title.toLowerCase().includes(searchInput[i])) {
    //                         return true;
    //                     }
    //                 }
    //                 return false;
    //             });
    //         });
    //         setSearchedCategories(arr);
    //         const selectedCat = arr.find((category) => category.name === selectedCategory);
    //         if (!selectedCat && arr.length > 0) {
    //             dispatch(setSelectedCategory(arr[0].name));
    //         }
    //     } else {
    //         setSearchedCategories(categories);
    //     }
    // }, [categories, search, searchInput]);

    const handleSearch = (categories) => {
        const result = categories.filter((category) => {
            for (let i = 0; i < searchInput.length; i++) {
                const word = searchInput[i];
                //const find = items.find((item) => item.title.toLowerCase().includes(word))
            }
        });
        return items;
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
    }, [items, catalog, selectedGroup, selectedCategory1, selectedCategory2, sideBarShowType]);

    return (
        <SidebarStyled sideBarOpened={sideBarOpened}>
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
