import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import colors from "../settings/colors";
import Item from "./Item";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedCategory1 } from "../store/manage";

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
    const groups = useSelector((state) => state.manage.groups);
    const selectedGroup = useSelector((state) => state.manage.selectedGroup);
    const selectedCategory1 = useSelector((state) => state.manage.selectedCategory1);
    const selectedCategory2 = useSelector((state) => state.manage.selectedCategory2);

    const [searchedCategories, setSearchedCategories] = useState(null);

    const [list, setList] = useState([]);

    useEffect(() => {
        if (items) {
            if (!selectedCategory1 && !selectedCategory2) {
                setList(groups);
            }
        }
    }, [items, groups, selectedGroup, selectedCategory1, selectedCategory2]);

    return (
        <SidebarStyled sideBarOpened={sideBarOpened}>
            <Header>Каталог</Header>
            <ItemsList>
                {list.map((category) => (
                    <Item key={category} category={category} />
                ))}
            </ItemsList>
        </SidebarStyled>
    );
}

export default Sidebar;
