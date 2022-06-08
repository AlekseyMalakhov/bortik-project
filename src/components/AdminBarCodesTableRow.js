import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import ThreeDotsButtonAdmin from "./ThreeDotsButtonAdmin";
import AdminDeleteBarcodeModal from "./AdminDeleteBarcodeModal";
import AdminEditBarCodeModal from "./AdminEditBarCodeModal";

function AdminBarCodesTableRow({ barcode }) {
    const [showBarcodeDelete, setShowBarcodeDelete] = useState(false);
    const [showBarcodeEdit, setShowBarcodeEdit] = useState(false);

    const deleteBarcode = () => {
        setShowBarcodeDelete(true);
    };

    const editBarcode = () => {
        setShowBarcodeEdit(true);
    };

    const cancel = () => {
        setShowBarcodeDelete(false);
        setShowBarcodeEdit(false);
    };

    return (
        <React.Fragment>
            <tr style={{ backgroundColor: "#f5f5f5" }}>
                <td>{barcode.article}</td>
                <td>{barcode.barcode}</td>
                <td style={{ verticalAlign: "middle" }}>
                    <Dropdown align="start" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Dropdown.Toggle as={ThreeDotsButtonAdmin} />
                        <Dropdown.Menu style={{ width: "160px" }}>
                            <Dropdown.Item onClick={() => editBarcode()}>Редактировать</Dropdown.Item>
                            <Dropdown.Item onClick={() => deleteBarcode()}>Удалить штрихкод</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </td>
            </tr>
            <AdminDeleteBarcodeModal show={showBarcodeDelete} onHide={cancel} barcode={barcode} />
            <AdminEditBarCodeModal show={showBarcodeEdit} onHide={cancel} barcode={barcode} />
        </React.Fragment>
    );
}

export default AdminBarCodesTableRow;
