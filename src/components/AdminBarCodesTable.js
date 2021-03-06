import React, { useState } from "react";
import styled from "@emotion/styled";
import Table from "react-bootstrap/Table";
import AdminBarCodesTableRow from "./AdminBarCodesTableRow";
import Button from "react-bootstrap/Button";
import AdminAddBarCodeModal from "./AdminAddBarCodeModal";

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
const ButtonContainer = styled.div({
    position: "fixed",
    top: "80px",
    right: "50px",
});

function AdminBarCodesTable({ barcodes }) {
    const [showAdd, setShowAdd] = useState(false);

    const cancel = () => {
        setShowAdd(false);
    };

    if (barcodes.length > 0) {
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
                            {barcodes.map((barcode) => (
                                <AdminBarCodesTableRow barcode={barcode} key={barcode.id} />
                            ))}
                        </tbody>
                    </Table>
                </TableContainer>
                <ButtonContainer>
                    <Button variant="success" onClick={() => setShowAdd(true)}>
                        Добавить штрихкод
                    </Button>
                </ButtonContainer>
                <AdminAddBarCodeModal show={showAdd} onHide={cancel} />
            </AdminOrdersTableStyled>
        );
    }
    return (
        <React.Fragment>
            <ButtonContainer>
                <Button variant="success" onClick={() => setShowAdd(true)}>
                    Добавить штрихкод
                </Button>
            </ButtonContainer>
            <AdminAddBarCodeModal show={showAdd} onHide={cancel} />
            <EmptyCart>Нет штрихкодов</EmptyCart>;
        </React.Fragment>
    );
}

export default AdminBarCodesTable;
