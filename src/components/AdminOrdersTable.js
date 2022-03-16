import React from "react";
import styled from "@emotion/styled";
import Table from "react-bootstrap/Table";
import AdminTableRow from "./AdminTableRow";

const AdminOrdersTableStyled = styled.div({
    width: "100%",
});

const EmptyCart = styled.div({
    textAlign: "center",
    fontSize: "20px",
    fontWeight: "500",
});

function AdminOrdersTable({ orders }) {
    if (orders.length > 0) {
        return (
            <AdminOrdersTableStyled>
                <Table bordered>
                    <thead>
                        <tr>
                            <th>Штрихкод</th>
                            <th>Код</th>
                            <th>Артикул</th>
                            <th>Номенклатура</th>
                            <th>Количество</th>
                            <th>Цена</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <AdminTableRow order={order} key={order.id} />
                        ))}
                    </tbody>
                </Table>
            </AdminOrdersTableStyled>
        );
    }
    return <EmptyCart>Нет заказов</EmptyCart>;
}

export default AdminOrdersTable;
