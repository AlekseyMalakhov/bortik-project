import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import AddRemoveButton from "./AddRemoveButton";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../store/manage";

const AddRemoveStyled = styled.div({
    display: "flex",
    justifyContent: "center",
    marginRight: "10px",
    marginLeft: "10px",
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

function AddRemove({ item }) {
    const dispatch = useDispatch();
    const [number, setNumber] = useState(0);

    useEffect(() => {
        if (number > 0) {
            const obj = {
                id: item.id,
                number,
            };
            dispatch(addItemToCart(obj));
        }
        if (number === 0) {
            dispatch(removeItemFromCart(item));
        }
    }, [number]);

    const handleInput = (e) => {
        console.log(e.target.value);
        const number = allowOnlyNumbers(e.target.value);
        if (number >= 0) {
            setNumber(number);
        }
        if (e.target.value === "") {
            setNumber("");
        }
    };

    const closeKeyboard = (e) => {
        if (e.key === "Enter") {
            e.target.blur();
        }
    };

    const subtraction = () => {
        if (number > 0) {
            setNumber(number - 1);
        }
    };

    const handleEmptyString = () => {
        if (number === "") {
            setNumber(0);
        }
    };

    return (
        <AddRemoveStyled>
            <AddRemoveButton icon="minus" onClick={subtraction} />
            <MyInput
                onChange={handleInput}
                value={number}
                onFocus={(e) => e.target.select()}
                onKeyDown={closeKeyboard}
                inputMode="numeric"
                onBlur={handleEmptyString}
            />
            <AddRemoveButton icon="plus" onClick={() => setNumber(number + 1)} />
        </AddRemoveStyled>
    );
}

export default AddRemove;
