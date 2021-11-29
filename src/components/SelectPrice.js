import React, { useEffect } from "react";
import styled from "@emotion/styled";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useSelector, useDispatch } from "react-redux";
import { setPriceType } from "../store/manage";

const SelectPriceStyled = styled.div({});

const options = ["с НДС", "без НДС", "без НДС (от 250р)"];

function SelectPrice() {
    const dispatch = useDispatch();
    const priceType = useSelector((state) => state.manage.priceType);

    useEffect(() => {
        if (!priceType) {
            const type = localStorage.getItem("price_type");
            if (type) {
                dispatch(setPriceType(type));
            } else {
                dispatch(setPriceType(options[0]));
            }
        }
    }, [priceType]);

    const handlePriceType = (type) => {
        dispatch(setPriceType(type));
    };

    return (
        <SelectPriceStyled>
            <DropdownButton id="dropdown" drop="up" variant="outline-secondary" title={priceType ? priceType : ""} size="sm">
                {options.map((type) => (
                    <Dropdown.Item eventKey={type} key={type} onClick={() => handlePriceType(type)}>
                        {type}
                    </Dropdown.Item>
                ))}
            </DropdownButton>
        </SelectPriceStyled>
    );
}

export default SelectPrice;
