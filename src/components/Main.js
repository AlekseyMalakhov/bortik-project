import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Card from "./Card";
import colors from "../settings/colors";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";

const MainStyled = styled.div(({ sideBarOpened, mobileScreen }) => {
    const getLeft = () => {
        if (mobileScreen) {
            return "0";
        } else {
            return sideBarOpened ? "170px" : "0";
        }
    };

    return {
        //position: "absolute",
        display: "flex",
        width: "100%",
        //left: getLeft(),
        //top: "50px",
        //bottom: mobileScreen ? "40px" : "80px",
        marginBottom: mobileScreen ? "40px" : "80px",
        overflow: "auto",
        overflowX: "hidden",
        flexDirection: "column",
        //width: mobileScreen ? "100%" : "calc(100% - 170px)",
        alignItems: "center",
        backgroundColor: colors.lightGreyBackground,
        padding: "10px 10px",
    };
});

const Error = styled.div({
    margin: "30px 10px",
});

const MyButton = styled(Button)`
    margin-top: 20px;
    margin-bottom: 20px;
    &:focus {
        outline: none;
        box-shadow: none;
    }
`;

function Main() {
    const [showNumber, setShowNumber] = useState(20);
    const items = useSelector((state) => state.manage.items);
    const sideBarOpened = useSelector((state) => state.manage.sideBarOpened);
    const selectedCategory = useSelector((state) => state.manage.selectedCategory);
    const mobileScreen = useSelector((state) => state.manage.mobileScreen);

    useEffect(() => {
        setShowNumber(20);
    }, [items, selectedCategory]);

    const showMore = () => {
        setShowNumber(showNumber + 20);
    };

    if (items && selectedCategory) {
        return (
            <MainStyled sideBarOpened={sideBarOpened} mobileScreen={mobileScreen}>
                {items[selectedCategory].length > 0 ? (
                    items[selectedCategory].map((item, index) => (index <= showNumber ? <Card item={item} key={item.id} /> : null))
                ) : (
                    <Error>Нет товаров в данной категории</Error>
                )}
                {showNumber < items[selectedCategory].length ? (
                    <MyButton variant="primary" size={mobileScreen ? "sm" : ""} onClick={showMore}>
                        Показать еще
                    </MyButton>
                ) : null}
            </MainStyled>
        );
    }
    return null;
}

export default Main;
