import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Card from "./Card";
import colors from "../settings/colors";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";

const MainStyled = styled.div(({ sideBarOpened, mobileScreen }) => {
    return {
        display: "flex",
        width: "100%",
        marginBottom: mobileScreen ? "40px" : "80px",
        overflow: "auto",
        overflowX: "hidden",
        flexDirection: "column",
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
    const searchInput = useSelector((state) => state.manage.searchInput);
    const search = useSelector((state) => state.manage.search);

    const [searchedItems, setSearchedItems] = useState(null);

    useEffect(() => {
        if (search && searchInput.length > 0) {
            const searchedItems = {};
            for (const category in items) {
                const arr = items[category].filter((item) => {
                    for (let i = 0; i < searchInput.length; i++) {
                        if (item.title.toLowerCase().includes(searchInput[i])) {
                            return true;
                        }
                    }
                    return false;
                });
                searchedItems[category] = arr;
            }
            setSearchedItems(searchedItems);
        } else {
            setSearchedItems(items);
        }
    }, [items, search, searchInput]);

    const ref = React.createRef();

    useEffect(() => {
        setShowNumber(20);
        if (ref.current) {
            ref.current.scroll(0, 0);
        }
    }, [searchedItems, selectedCategory]);

    const showMore = () => {
        setShowNumber(showNumber + 20);
    };

    if (searchedItems && selectedCategory && searchedItems[selectedCategory]) {
        return (
            <MainStyled sideBarOpened={sideBarOpened} mobileScreen={mobileScreen} ref={ref}>
                {searchedItems[selectedCategory].length > 0 ? (
                    searchedItems[selectedCategory].map((item, index) => (index <= showNumber ? <Card item={item} key={item.id} /> : null))
                ) : (
                    <Error>Нет товаров в данной категории</Error>
                )}
                {showNumber < searchedItems[selectedCategory].length ? (
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
