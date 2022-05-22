import React from "react";
import Modal from "react-bootstrap/Modal";
import styled from "@emotion/styled";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Formik } from "formik";
import * as Yup from "yup";
import FormInput from "./FormInput";
import adminAPI from "../api/admin";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, getAdminOrders } from "../store/manage";
import { createDate } from "../utilities/calculate";
import priceTypes from "../settings/priceTypes";
import Dropdown from "react-bootstrap/Dropdown";
import { useState } from "react";
import { showAdminDoneModal } from "../utilities/helpers";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { useEffect } from "react";

const Row1 = styled.div({
    width: "100%",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: "8px",
});

const ListRow = styled.div({
    width: "100%",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    "&:hover": {
        backgroundColor: "#efeeee",
    },
});

const ButtonGroup = styled.div({
    display: "flex",
    justifyContent: "space-evenly",
    marginTop: "30px",
    marginBottom: "30px",
    width: "100%",
});

const ListContainer = styled.div({
    width: "100%",
    height: "200px",
    position: "relative",
});

const ShowSelected = styled.div({
    width: "100%",
    display: "flex",
    marginTop: "15px",
});

const FoundedNumber = styled.div({
    width: "100%",
    display: "flex",
    marginBottom: "15px",
});

function AdminAddCartItemModal({ show, onHide, order, ...otherProps }) {
    const [selectedItem, setSelectedItem] = useState(null);
    const [search, setSearch] = useState("");
    const [searchInput, setSearchInput] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.manage.loading);
    const items = useSelector((state) => state.manage.items);

    const cancel = () => {
        setSelectedItem(null);
        onHide();
    };

    const handleSubmit = () => {
        // article: "SMART.18028"
        // number: 1
        // price: 1.19
        // priceForManager: 0.99
        // sum: 1.19
        // title: "Рукав для запекания Komfi 30 см х 3 м"
        const data = {
            item: selectedItem,
            customer_id: order.customer_id,
            date: order.date,
            order_id: order.id,
            price: order.price_type === "с НДС" ? selectedItem.priceIncVAT : selectedItem.priceExcVAT,
        };
        dispatch(setLoading(true));
        adminAPI
            .addItemToOrder(data, order.id)
            .then((response) => {
                dispatch(setLoading(false));
                dispatch(getAdminOrders());
                if (response.status === 200) {
                    showAdminDoneModal("Заказ №" + order.id + " успешно отредактирован!");
                } else {
                    showAdminDoneModal("Неизвестная ошибка! Обратитесь к администратору или попробуйте позже.");
                }
                cancel();
            })
            .catch((err) => {
                dispatch(setLoading(false));
                showAdminDoneModal("Неизвестная ошибка! Обратитесь к администратору или попробуйте позже.");
                console.log(err);
            });
    };

    const Row = ({ index, style }) => (
        <ListRow style={style} onClick={() => setSelectedItem(filteredItems[index])}>
            <div style={{ width: "70%", paddingLeft: "15px", paddingRight: "20px" }}>{filteredItems[index].title.ru}</div>
            <div style={{ width: "30%" }}>{filteredItems[index].article}</div>
        </ListRow>
    );

    const handleSearch = (items) => {
        const result = items.filter((item) => {
            const name = item.title.ru.toLowerCase() + item.article;
            return searchInput.every((word) => {
                const regex = new RegExp(word, "gmiu");
                return regex.test(name);
            });
        });

        return result;
    };

    const searchItems = (val) => {
        const arr = val.split(" ");
        setSearch(val);
        setSearchInput(arr);
    };

    useEffect(() => {
        if (search && searchInput.length > 0) {
            const filtered = handleSearch(items);
            setFilteredItems(filtered);
        } else {
            if (items?.length > 0) {
                setFilteredItems(items);
            }
        }
    }, [search, searchInput]);

    return (
        <Modal show={show} {...otherProps} centered onHide={cancel} size="lg" backdrop="static" keyboard={false}>
            <Modal.Body style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                <p style={{ fontWeight: 700 }}>Заказ №{order.id}. Добавить товар.</p>
                <Row1>
                    <Form.Control type="text" value={search} onChange={(e) => searchItems(e.target.value)} placeholder="Поиск товара" />
                </Row1>
                <FoundedNumber>Найдено товаров: {filteredItems?.length}</FoundedNumber>
                <ListContainer>
                    <AutoSizer>
                        {({ height, width }) => (
                            <List style={{ border: "1px solid grey" }} height={200} itemCount={filteredItems.length} itemSize={40} width={width}>
                                {Row}
                            </List>
                        )}
                    </AutoSizer>
                </ListContainer>
                <ShowSelected>Добавить товар: {selectedItem ? selectedItem.title.ru : "нет"}</ShowSelected>
                <ButtonGroup>
                    <Button variant="outline-primary" onClick={cancel} disabled={loading}>
                        Отмена
                    </Button>
                    <Button variant="primary" type="submit" disabled={loading || !selectedItem} onClick={handleSubmit}>
                        Добавить
                    </Button>
                </ButtonGroup>
            </Modal.Body>
        </Modal>
    );
}
export default AdminAddCartItemModal;
