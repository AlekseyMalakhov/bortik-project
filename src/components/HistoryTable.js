import React from "react";
import styled from "@emotion/styled";
import HistoryTableBlock from "./HistoryTableBlock";

const HistoryTableStyled = styled.div({
    width: "100%",
});

function HistoryTable({ history }) {
    return (
        <HistoryTableStyled>
            {history.map((order) => (
                <HistoryTableBlock order={order} key={order.id} />
            ))}
        </HistoryTableStyled>
    );
}

export default HistoryTable;
