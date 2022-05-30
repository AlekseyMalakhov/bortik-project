import React from "react";
import styled from "@emotion/styled";
import Table from "react-bootstrap/Table";
import AdminBarCodesTableRow from "./AdminBarCodesTableRow";

const AdminOrdersTableStyled = styled.div({
    width: "100%",
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
                <Table bordered>
                    <thead>
                        <tr>
                            <th>Артикул</th>
                            <th>Штрихкод</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <AdminBarCodesTableRow order={order} key={order.id} />
                        ))}
                    </tbody>
                </Table>
            </AdminOrdersTableStyled>
        );
    }
    return <EmptyCart>Нет штрихкодов</EmptyCart>;
}

export default AdminBarCodesTable;
