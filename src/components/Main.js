import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Card from "./Card";
import colors from "../settings/colors";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import { setSelectedItems } from "../store/manage";
import { useTranslation } from "react-i18next";

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
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const [showNumber, setShowNumber] = useState(20);
    const items = useSelector((state) => state.manage.items);
    const selectedItems = useSelector((state) => state.manage.selectedItems);
    const showInStockOnly = useSelector((state) => state.manage.showInStockOnly);
    const sideBarOpened = useSelector((state) => state.manage.sideBarOpened);
    const selectedCategory = useSelector((state) => state.manage.selectedCategory);
    const mobileScreen = useSelector((state) => state.manage.mobileScreen);
    const searchInput = useSelector((state) => state.manage.searchInput);
    const search = useSelector((state) => state.manage.search);
    const selectedGroup = useSelector((state) => state.manage.selectedGroup);
    const selectedCategory1 = useSelector((state) => state.manage.selectedCategory1);
    const selectedCategory2 = useSelector((state) => state.manage.selectedCategory2);

    const handleSearch = (items) => {
        const result = items.filter((item) => {
            const name = item.title[i18n.resolvedLanguage].toLowerCase();
            return searchInput.every((word) => {
                const regex = new RegExp(word, "gmiu");
                return regex.test(name);
            });
        });

        return result;
    };

    useEffect(() => {
        let selected = [];
        if (!selectedGroup && !selectedCategory1 && !selectedCategory2) {
            selected = items;
        }
        if (selectedGroup && !selectedCategory1 && !selectedCategory2) {
            selected = items.filter((item) => item.group === selectedGroup);
        }
        if (selectedGroup && selectedCategory1 && !selectedCategory2) {
            selected = items.filter((item) => {
                if (item.group === selectedGroup && item.category1 === selectedCategory1) {
                    return true;
                }
                return false;
            });
        }
        if (selectedGroup && selectedCategory1 && selectedCategory2) {
            selected = items.filter((item) => {
                if (item.group === selectedGroup && item.category1 === selectedCategory1 && item.category2 === selectedCategory2) {
                    return true;
                }
                return false;
            });
        }
        if (search && searchInput.length > 0) {
            selected = handleSearch(selected);
        }
        if (showInStockOnly) {
            selected = selected.filter((item) => item.presence);
        }
        dispatch(setSelectedItems(selected));
    }, [items, selectedGroup, selectedCategory1, selectedCategory2, searchInput, search, showInStockOnly]);

    const ref = React.createRef();

    useEffect(() => {
        setShowNumber(20);
        if (ref.current) {
            ref.current.scroll(0, 0);
        }
    }, [selectedItems, selectedCategory]);

    const showMore = () => {
        setShowNumber(showNumber + 20);
    };

    return (
        <MainStyled sideBarOpened={sideBarOpened} mobileScreen={mobileScreen} ref={ref}>
            {selectedItems.length > 0 ? (
                selectedItems.map((item, index) => (index <= showNumber ? <Card item={item} key={item.id} /> : null))
            ) : (
                <Error>{t("Нет товаров в данной категории. Измените параметры поиска.")}</Error>
            )}
            {showNumber < selectedItems.length ? (
                <MyButton variant="primary" size={mobileScreen ? "sm" : ""} onClick={showMore}>
                    {t("Показать еще")}
                </MyButton>
            ) : null}
        </MainStyled>
    );
}

export default Main;
