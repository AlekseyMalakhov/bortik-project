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
    const selectedGroup = useSelector((state) => state.manage.selectedGroup);
    const selectedCategory1 = useSelector((state) => state.manage.selectedCategory1);
    const selectedCategory2 = useSelector((state) => state.manage.selectedCategory2);

    const [searchedItems, setSearchedItems] = useState([]);

    useEffect(() => {
        console.log("selectedGroup " + selectedGroup);
        console.log("selectedCategory1 " + selectedCategory1);
        console.log("selectedCategory2 " + selectedCategory2);
        if (!selectedGroup && !selectedCategory1 && !selectedCategory2) {
            setSearchedItems(items);
        }
        if (selectedGroup && !selectedCategory1 && !selectedCategory2) {
            const selected = items.filter((item) => item.group === selectedGroup);
            setSearchedItems(selected);
        }
        if (selectedGroup && selectedCategory1 && !selectedCategory2) {
            const selected = items.filter((item) => {
                if (item.group === selectedGroup && item.category1 === selectedCategory1) {
                    return true;
                }
                return false;
            });
            setSearchedItems(selected);
        }
        if (selectedGroup && selectedCategory1 && selectedCategory2) {
            const selected = items.filter((item) => {
                if (item.group === selectedGroup && item.category1 === selectedCategory1 && item.category2 === selectedCategory2) {
                    return true;
                }
                return false;
            });
            setSearchedItems(selected);
        }
    }, [items, selectedGroup, selectedCategory1, selectedCategory2]);

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

    return (
        <MainStyled sideBarOpened={sideBarOpened} mobileScreen={mobileScreen} ref={ref}>
            {searchedItems.length > 0 ? (
                searchedItems.map((item, index) => (index <= showNumber ? <Card item={item} key={item.id} /> : null))
            ) : (
                <Error>Нет товаров в данной категории</Error>
            )}
            {showNumber < searchedItems.length ? (
                <MyButton variant="primary" size={mobileScreen ? "sm" : ""} onClick={showMore}>
                    Показать еще
                </MyButton>
            ) : null}
        </MainStyled>
    );
}

export default Main;
