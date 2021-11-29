import React, { useState } from "react";
import styled from "@emotion/styled";
import Form from "react-bootstrap/Form";

const SearchStyled = styled.div({
    display: "flex",
});

const SearchInput = styled(Form.Control)({
    position: "relative",
});

const SearchIcon = styled.div(({ focus, value }) => {
    return {
        position: "relative",
        width: "16px",
        right: "200px",
        top: "7px",
        visibility: focus || value ? "hidden" : "visible",
    };
});

const CloseButton = styled.div({
    position: "relative",
    width: "20px",
    height: "20px",
    top: "5px",
    cursor: "pointer",
    "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        borderRadius: "10px",
    },
});

function Search({ show, onHide }) {
    const [focus, setFocus] = useState(false);
    const [value, setValue] = useState("");

    const handleInput = (e) => {
        setValue(e.target.value);
    };
    if (show) {
        return (
            <SearchStyled>
                <SearchInput onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} onChange={handleInput} />
                <SearchIcon focus={focus} value={value}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="grey" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                </SearchIcon>
                <CloseButton onClick={onHide}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                </CloseButton>
            </SearchStyled>
        );
    }
    return null;
}

export default Search;
