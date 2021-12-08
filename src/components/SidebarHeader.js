import React from "react";
import styled from "@emotion/styled";
import { useSelector, useDispatch } from "react-redux";
import SidebarBackButton from "./SidebarBackButton";
import SidebarExitButton from "./SidebarExitButton";
import { changeSideBarShowType, setSelectedCategory1, setSelectedCategory2, setSelectedGroup } from "../store/manage";

const SidebarHeaderStyled = styled.div({
    marginTop: "10px",
    textAlign: "center",
    fontSize: "20px",
    fontWeight: "500",
});

function SidebarHeader() {
    const dispatch = useDispatch();
    const sideBarShowType = useSelector((state) => state.manage.sideBarShowType);
    const selectedCategory2 = useSelector((state) => state.manage.selectedCategory2);

    const goUp = () => {
        if (sideBarShowType === "categories2") {
            dispatch(changeSideBarShowType("categories1"));
            dispatch(setSelectedCategory1(null));
            dispatch(setSelectedCategory2(null));
        }
        if (sideBarShowType === "categories1") {
            dispatch(changeSideBarShowType("groups"));
            dispatch(setSelectedCategory1(null));
            dispatch(setSelectedCategory2(null));
            dispatch(setSelectedGroup(null));
        }
    };

    return <SidebarHeaderStyled>{sideBarShowType === "groups" ? "Каталог" : <SidebarBackButton onClick={goUp} />}</SidebarHeaderStyled>;
}

export default SidebarHeader;
