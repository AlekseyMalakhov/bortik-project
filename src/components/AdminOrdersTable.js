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
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Наименование</th>
                            <th>Кол.</th>
                            <th>Цена</th>
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
