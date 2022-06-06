import React from "react";
import styled from "@emotion/styled";
import Table from "react-bootstrap/Table";
import AdminBarCodesTableRow from "./AdminBarCodesTableRow";

const AdminOrdersTableStyled = styled.div({
    width: "100%",
    display: "flex",
    justifyContent: "center",
});
const TableContainer = styled.div({
    width: "50%",
});

const EmptyCart = styled.div({
    textAlign: "center",
    fontSize: "20px",
    fontWeight: "500",
});

function AdminBarCodesTable({ orders }) {
    if (orders.length > 0) {
        return (
            <AdminOrdersTableStyled>
                <TableContainer>
                    <Table bordered>
                        <thead>
                            <tr>
                                <th>Артикул</th>
                                <th>Штрихкод</th>
                                <th style={{ width: "120px" }}>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <AdminBarCodesTableRow order={order} key={order.id} />
                            ))}
                        </tbody>
                    </Table>
                </TableContainer>
            </AdminOrdersTableStyled>
        );
    }
    return <EmptyCart>Нет штрихкодов</EmptyCart>;
}

export default AdminBarCodesTable;
