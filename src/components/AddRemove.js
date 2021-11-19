import React, { useState } from "react";
import styled from "@emotion/styled";
import AddRemoveButton from "./AddRemoveButton";
import Form from "react-bootstrap/Form";

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

function AddRemove() {
    const [number, setNumber] = useState(0);

    const handleInput = (e) => {
        const number = allowOnlyNumbers(e.target.value);
        if (number >= 0) {
            setNumber(number);
        }
    };

    const subtraction = () => {
        if (number > 0) {
            setNumber(number - 1);
        }
    };

    return (
        <AddRemoveStyled>
            <AddRemoveButton icon="minus" onClick={subtraction} />
            <MyInput onChange={handleInput} value={number} onFocus={(e) => e.target.select()} inputMode="numeric" />
            <AddRemoveButton icon="plus" onClick={() => setNumber(number + 1)} />
        </AddRemoveStyled>
    );
}

export default AddRemove;
