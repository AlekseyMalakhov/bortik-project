import React from "react";
import styled from "@emotion/styled";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useSelector, useDispatch } from "react-redux";
import { setPriceType } from "../store/manage";
import priceTypes from "../settings/priceTypes";

const SelectPriceStyled = styled.div({});

function SelectPrice() {
    const dispatch = useDispatch();
    const priceType = useSelector((state) => state.manage.priceType);

    const handlePriceType = (type) => {
        dispatch(setPriceType(type));
    };

    return (
        <SelectPriceStyled>
            <DropdownButton id="dropdown" drop="up" variant="outline-secondary" title={priceType ? priceType : ""} size="sm">
                {priceTypes.map((type) => (
                    <Dropdown.Item eventKey={type} key={type} onClick={() => handlePriceType(type)}>
                        {type}
                    </Dropdown.Item>
                ))}
            </DropdownButton>
        </SelectPriceStyled>
    );
}

export default SelectPrice;
