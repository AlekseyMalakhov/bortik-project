import React from "react";
import styled from "@emotion/styled";
import Card from "./Card";
import colors from "../settings/colors";
import { useSelector } from "react-redux";
import { VariableSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

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
        width: "100%",
        // display: "flex",
        // flexWrap: "wrap",
        // justifyContent: "center",
        // alignItems: "center",
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
            {/* {items ? items.map((item) => <Card item={item} key={item.id} />) : null} */}
            {items.length > 0 ? (
                <AutoSizer>
                    {({ height, width }) => (
                        <List
                            height={height}
                            itemCount={70}
                            itemSize={() => 200}
                            width={mobileScreen ? width : width - 170}
                            style={{ overflowX: "hidden" }}
                        >
                            {/* {({ index, style }) => <div style={style}>{items[index].title}</div>} */}
                            {({ index, style }) => <Card item={items[index]} key={items[index].id} style={style} />}
                        </List>
                    )}
                </AutoSizer>
            ) : null}
        </MainStyled>
    );
}

export default Main;
