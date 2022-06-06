import React from "react";
import Modal from "react-bootstrap/Modal";
import styled from "@emotion/styled";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Formik } from "formik";
import * as Yup from "yup";
import FormInput from "../components/FormInput";
import adminAPI from "../api/admin";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, getBarcodes } from "../store/manage";
import { showAdminDoneModal } from "../utilities/helpers";

const Row1 = styled.div({
    width: "100%",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
});

const ButtonGroup = styled.div({
    display: "flex",
    justifyContent: "space-evenly",
    marginTop: "30px",
    marginBottom: "30px",
});

function AdminAddBarCodeModal({ show, onHide, ...otherProps }) {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.manage.loading);

    const validationSchema = Yup.object().shape({
        article: Yup.string().required("Укажите артикул"),
        barcode: Yup.string().required("Укажите штрихкод"),
    });

    const handleSubmit = (values) => {
        dispatch(setLoading(true));
        adminAPI
            .addBarcode(values)
            .then((response) => {
                dispatch(setLoading(false));
                dispatch(getBarcodes());
                if (response.status === 200) {
                    showAdminDoneModal("Штрихкод добавлен");
                } else {
                    showAdminDoneModal("Неизвестная ошибка! Обратитесь к администратору или попробуйте позже.");
                }
                onHide();
            })
            .catch((err) => {
                dispatch(setLoading(false));
                showAdminDoneModal("Неизвестная ошибка! Обратитесь к администратору или попробуйте позже.");
                console.log(err);
            });
    };

    return (
        <Modal show={show} {...otherProps} centered onHide={onHide} size="lg" backdrop="static" keyboard={false}>
            <Modal.Body style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                <p style={{ fontWeight: 700 }}>Добавить штрихкод</p>
                <Formik
                    initialValues={{
                        article: "",
                        barcode: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ handleSubmit, values }) => (
                        <Form noValidate onSubmit={handleSubmit} style={{ width: "100%", paddingLeft: "10px", paddingRight: "10px" }}>
                            <Row1>
                                <FormInput name="article" label="Артикул" formGroupStyle={{ width: "100%", paddingRight: "20px" }} />
                                <FormInput name="barcode" label="Штрихкод" formGroupStyle={{ width: "100%", paddingLeft: "20px" }} />
                            </Row1>
                            <ButtonGroup>
                                <Button variant="outline-primary" onClick={onHide} disabled={loading}>
                                    Отмена
                                </Button>
                                <Button variant="primary" type="submit" disabled={loading}>
                                    Сохранить
                                </Button>
                            </ButtonGroup>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
}
export default AdminAddBarCodeModal;
