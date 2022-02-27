import React from "react";
import Modal from "react-bootstrap/Modal";
import styled from "@emotion/styled";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Formik } from "formik";
import * as Yup from "yup";
import FormInput from "../components/FormInput";

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

function AdminEditCartItemModal({ show, onHide, onSave, order, item, ...otherProps }) {
    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Укажите название товара"),
        article: Yup.string().required("Укажите артикул"),
        number: Yup.number().required("Укажите число товаров"),
        sum: Yup.string().required("Укажите число товаров"),
        price: Yup.string().required("Укажите цену для клиента"),
        price_for_manager: Yup.string().nullable().required("Укажите цену для менеджера"),
    });

    const handleSubmit = (values) => {
        console.log(values);
    };

    return (
        <Modal show={show} {...otherProps} centered onHide={onHide} size="lg" backdrop="static" keyboard={false}>
            <Modal.Body style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                <p style={{ fontWeight: 700 }}>Заказ №{order.id}. Редактирование товара.</p>
                {item ? (
                    <Formik
                        initialValues={{
                            title: item.title,
                            article: item.article,
                            number: item.number,
                            sum: item.sum,
                            price: item.price,
                            price_for_manager: item.price_for_manager ? item.price_for_manager : "",
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ handleSubmit, values }) => (
                            <Form noValidate onSubmit={handleSubmit} style={{ width: "100%", paddingLeft: "10px", paddingRight: "10px" }}>
                                <FormInput name="title" label="Наименование" />
                                <Row1>
                                    <FormInput name="article" label="Артикул" formGroupStyle={{ width: "100%", paddingRight: "20px" }} />
                                    <FormInput name="number" label="Количество" formGroupStyle={{ width: "100%", paddingLeft: "20px" }} />
                                </Row1>
                                <Row1>
                                    <FormInput name="price" label="Цена для клиента" formGroupStyle={{ width: "100%", paddingRight: "20px" }} />
                                    <FormInput
                                        name="price_for_manager"
                                        label="Цена для менеджера"
                                        formGroupStyle={{ width: "100%", paddingLeft: "20px" }}
                                    />
                                </Row1>
                                <FormInput name="sum" label="Сумма" />

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
        </Modal>
    );
}
export default AdminEditCartItemModal;
