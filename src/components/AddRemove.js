import React from "react";
import styled from "@emotion/styled";
import AddRemoveButton from "./AddRemoveButton";

const AddRemoveStyled = styled.div({
    display: "flex",
    justifyContent: "center",
    marginRight: "10px",
    marginLeft: "10px",
});

const Text = styled.div({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid black",
    margin: "auto 10px",
    padding: "7px",
    borderRadius: "3px",
    fontSize: "14px",
});

function AddRemove() {
    return (
        <AddRemoveStyled>
            <AddRemoveButton icon="minus" />
            <Text>{1000}</Text>
            <AddRemoveButton icon="plus" />
        </AddRemoveStyled>
    );
}

export default AddRemove;