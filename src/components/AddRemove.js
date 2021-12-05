import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import AddRemoveButton from "./AddRemoveButton";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../store/manage";

const AddRemoveStyled = styled.div({
    display: "flex",
    justifyContent: "center",
    margin: "10px 10px",
    width: "162px",
});

const MyInput = styled(Form.Control)`
    width: 70px;
    margin: auto 10px;
`;

const allowOnlyNumbers = (text) => {
    const regex1 = /[^\d]/g;
    const onlyNumbers = text.replace(regex1, "");
    const number = Number.parseInt(onlyNumbers);
    return number;
};

function AddRemove({ item, inCart }) {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.manage.cart);
    const [number, setNumber] = useState(0);

    useEffect(() => {
        if (cart.length === 0) {
            setNumber(0);
        }
    }, [cart]);

    useEffect(() => {
        if (inCart) {
            setNumber(inCart.number);
        }
    }, [inCart]);

    const changeNumber = (newNumber) => {
        const obj = {
            ...item,
            number: newNumber,
        };
        dispatch(addItemToCart(obj));
    };

    const handleInput = (e) => {
        const number = allowOnlyNumbers(e.target.value);
        if (number >= 0) {
            setNumber(number);
            changeNumber(number);
        }
        if (e.target.value === "") {
            setNumber("");
            return;
        }
        if (number === 0) {
            setNumber(0);
            dispatch(removeItemFromCart(item));
            return;
        }
    };

    const closeKeyboard = (e) => {
        if (e.key === "Enter") {
            e.target.blur();
        }
    };

    const minusItem = () => {
        if (number - 1 > 0) {
            setNumber(number - 1);
            changeNumber(number - 1);
            return;
        }
        if (number - 1 === 0) {
            setNumber(0);
            dispatch(removeItemFromCart(item));
            return;
        }
    };

    const plusItem = () => {
        setNumber(number + 1);
        changeNumber(number + 1);
    };

    const handleEmptyString = () => {
        if (number === "") {
            setNumber(0);
            dispatch(removeItemFromCart(item));
        }
    };

    return (
        <AddRemoveStyled>
            <AddRemoveButton icon="minus" onClick={minusItem} />
            <MyInput
                onChange={handleInput}
                value={number}
                onFocus={(e) => e.target.select()}
                onKeyDown={closeKeyboard}
                inputMode="numeric"
                onBlur={handleEmptyString}
            />
            <AddRemoveButton icon="plus" onClick={plusItem} />
        </AddRemoveStyled>
    );
}

export default AddRemove;
