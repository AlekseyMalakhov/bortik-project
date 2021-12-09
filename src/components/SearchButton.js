import React from "react";
import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import { setSearch } from "../store/manage";
import { useNavigate } from "react-router";

const SearchButtonStyled = styled.div({
    marginLeft: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "42px",
    height: "42px",
    cursor: "pointer",
    "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        borderRadius: "20px",
    },
});

function SearchButton() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const toggleSearch = () => {
        dispatch(setSearch(true));
        navigate("/");
    };

    return (
        <SearchButtonStyled onClick={toggleSearch}>
            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="white" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
        </SearchButtonStyled>
    );
}

export default SearchButton;
