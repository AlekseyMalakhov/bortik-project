import React from "react";
import Modal from "react-bootstrap/Modal";
import styled from "@emotion/styled";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Formik } from "formik";
import * as Yup from "yup";
import FormInput from "../components/FormInput";

const Row1 = styled.div({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
});

const ButtonGroup = styled.div({
    display: "flex",
    justifyContent: "space-evenly",
    marginTop: "30px",
    marginBottom: "30px",
});

function AdminEditCartItemModal({ show, onHide, onSave, order, ...otherProps }) {
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Укажите имя"),
        phone: Yup.string().required("Укажите телефон"),
    });

    const handleSubmit = (values) => {};

    return (
        <Modal show={show} {...otherProps} size="sm" centered onHide={onHide} size="lg">
            <Modal.Body style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                <p>Заказ №{order.id}. Редактирование товара.</p>
                {order ? (
                    <Formik
                        initialValues={{
                            name: order.date,
                            phone: order.price_type,
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ handleSubmit, values }) => (
                            <Form noValidate onSubmit={handleSubmit} style={{ maxWidth: "400px", width: "100%" }}>
                                <FormInput name="name" label="ФИО*" />
                                <FormInput name="phone" label="Телефон*" inputMode="tel" placeholder={"+375xxxxxxxxx"} />

                                <ButtonGroup>
                                    <Button variant="outline-primary" onClick={onHide}>
                                        Отмена
                                    </Button>
                                    <Button variant="primary" type="submit">
                                        Сохранить
                                    </Button>
                                </ButtonGroup>
                            </Form>
                        )}
                    </Formik>
                ) : null}
            </Modal.Body>
            <Modal.Footer style={{ display: "flex", justifyContent: "space-evenly" }}>
                <Button onClick={onHide} variant="outline-primary" style={{ width: "110px" }}>
                    Отмена
                </Button>
                <Button onClick={onSave} style={{ width: "110px" }}>
                    Сохранить
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
export default AdminEditCartItemModal;
