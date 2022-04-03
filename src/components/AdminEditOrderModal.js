import React from "react";
import Modal from "react-bootstrap/Modal";
import styled from "@emotion/styled";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Formik } from "formik";
import * as Yup from "yup";
import FormInput from "./FormInput";
import adminAPI from "../api/admin";
import { useDispatch } from "react-redux";
import { setLoading, getAdminOrders } from "../store/manage";

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

function AdminEditOrderModal({ show, onHide, order, ...otherProps }) {
    //const dispatch = useDispatch();

    // const validationSchema = Yup.object().shape({
    //     title: Yup.string().required("Укажите название товара"),
    //     article: Yup.string().required("Укажите артикул"),
    //     number: Yup.number().required("Укажите число товаров"),
    //     sum: Yup.string().required("Укажите суммарную стоимость"),
    //     price: Yup.number().required("Укажите цену за единицу товара для клиента"),
    //     price_for_manager: Yup.number().nullable().required("Укажите цену за единицу товара для менеджера"),
    // });

    const handleSubmit = (values) => {
        console.log(values);
        onHide();
    };

    return (
        <Modal show={show} {...otherProps} centered onHide={onHide} size="lg" backdrop="static" keyboard={false}>
            <Modal.Body style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                <p style={{ fontWeight: 700 }}>Заказ №{order.id}. Редактирование заказа.</p>

                <Formik
                    initialValues={{
                        comment: order.comment,
                    }}
                    //validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ handleSubmit, values }) => (
                        <Form noValidate onSubmit={handleSubmit} style={{ width: "100%", paddingLeft: "10px", paddingRight: "10px" }}>
                            <Row1>
                                <FormInput name="comment" label="Комментарий" />
                            </Row1>

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
            </Modal.Body>
        </Modal>
    );
}
export default AdminEditOrderModal;
