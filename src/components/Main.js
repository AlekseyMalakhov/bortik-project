import React from "react";
import styled from "@emotion/styled";
import Card from "./Card";
import colors from "../settings/colors";
import { useSelector } from "react-redux";

const MainStyled = styled.div(({ sideBarOpened, mobileScreen }) => {
    const getLeft = () => {
        if (mobileScreen) {
            return "0";
        } else {
            return sideBarOpened ? "170px" : "0";
        }
    };

    const bottom = mobileScreen ? "40px" : "80px";

    return {
        position: "absolute",
        top: "50px",
        left: getLeft(),
        transition: "left 0.5s",
        bottom: bottom,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.lightGreyBackground,
        overflow: "auto",
    };
});

function Main() {
    const items = useSelector((state) => state.manage.items);
    const sideBarOpened = useSelector((state) => state.manage.sideBarOpened);
    const mobileScreen = useSelector((state) => state.manage.mobileScreen);

    return (
        <MainStyled sideBarOpened={sideBarOpened} mobileScreen={mobileScreen}>
            {items ? items.map((item) => <Card item={item} key={item.id} />) : null}
        </MainStyled>
    );
}

export default Main;
