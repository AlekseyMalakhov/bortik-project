import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import AddRemoveButton from "./AddRemoveButton";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../store/manage";
import AskRemoveItemFromCart from "./AskRemoveItemFromCart";

const AddRemoveStyled = styled.div({
    display: "flex",
    justifyContent: "center",
    margin: "0px 0px",
    // width: "162px",
    alignItems: "center",
    borderStyle: "solid",
    borderRadius: "8px",
    borderColor: "#e0e4e8",
    borderWidth: "thin",
});

const MyInput = styled(Form.Control)(({ type }) => {
    if (type === "small") {
        return {
            height:"100%",
            borderBottom: "none",
            borderTop: "none",
            borderRadius:"0",
            width: "70px",
            // margin: "auto 10px",
            padding: "0.1rem",
            textAlign:"center",
            padding:"1px 1px 1px 1px",
            "&:focus": {
                outline: "none !important",
                boxShadow: "none !important",
                
            },
        };
    }
    return {
        height:"100%",
        borderRadius:"0",
        borderBottom: "none",
        borderTop: "none",
        width: "70px",
        // margin: "auto 10px",
        textAlign: "center",
        // padding:"1px 1px 1px 1px",
        "&:focus": {
            outline: "none !important",
            boxShadow: "none !important",
           
        },
    };
});

const allowOnlyNumbers = (text) => {
    const regex1 = /[^\d]/g;
    const onlyNumbers = text.replace(regex1, "");
    const number = Number.parseInt(onlyNumbers);
    return number;
};

function AddRemove({ item, inCart, type }) {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.manage.cart);
    const [number, setNumber] = useState(0);
    const [showAsk, setShowAsk] = useState(false);

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

    const handleDeleteItem = () => {
        setNumber(0);
        dispatch(removeItemFromCart(item));
    };

    const minusItem = () => {
        if (number - 1 > 0) {
            setNumber(number - 1);
            changeNumber(number - 1);
            return;
        }
        if (number - 1 === 0) {
            if (type === "small") {
                setShowAsk(true);
            } else {
                handleDeleteItem();
            }
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
            <AddRemoveButton icon="minus" onClick={minusItem} type={type} />
            <MyInput
                type={type}
                onChange={handleInput}
                value={number}
                onFocus={(e) => e.target.select()}
                onKeyDown={closeKeyboard}
                inputMode="numeric"
                onBlur={handleEmptyString}
            />
            <AddRemoveButton icon="plus" onClick={plusItem} type={type} />
            <AskRemoveItemFromCart show={showAsk} onHide={() => setShowAsk(false)} onDelete={handleDeleteItem} />
        </AddRemoveStyled>
    );
}

export default AddRemove;
