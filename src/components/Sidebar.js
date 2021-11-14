import React from "react";
import styled from "@emotion/styled";
import colors from "../settings/colors";

const SidebarStyled = styled.div({
    position: "absolute",
    top: "50px",
    bottom: "0px",
    backgroundColor: colors.greyBackground,
    width: "150px",
});

function Sidebar() {
    return <SidebarStyled> Sidebar</SidebarStyled>;
}

export default Sidebar;
