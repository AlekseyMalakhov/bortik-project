import React from "react";
import styled from "@emotion/styled";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Formik } from "formik";
import * as Yup from "yup";
import FormInput from "./FormInput";

const CartFormStyled = styled.div({
    marginTop: "30px",
});

const validationSchema = Yup.object().shape({
    name_user: Yup.mixed().required().label("Имя").typeError("Укажите имя"),
    email: Yup.string().required().email().label("email").typeError("Укажите email"),
    phone: Yup.string()
        .matches(/\+\d{5}\d+/)
        .required()
        .label("Телефон")
        .typeError("Укажите телефон"),
});

function CartForm() {
    const handleSubmit = (values) => {
        console.log(values);
    };
    return (
        <CartFormStyled>
            <Formik
                initialValues={{
                    name_user: "",
                    email: "",
                    phone: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ handleSubmit, handleChange, setFieldTouched, values, touched, errors }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <FormInput name="name_user" label="ФИО*" />
                        <FormInput name="phone" label="Телефон*" inputMode="numeric" />
                        <FormInput name="email" label="Email*" />
                        {console.log(errors)}
                        <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
                            <Button variant="primary" type="submit">
                                Отправить
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </CartFormStyled>
    );
}

export default CartForm;
