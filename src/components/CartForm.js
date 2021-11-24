import React from "react";
import styled from "@emotion/styled";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Formik } from "formik";
import * as Yup from "yup";

const CartFormStyled = styled.div({
    marginTop: "30px",
});

const validationSchema = Yup.object().shape({
    fullname: Yup.string().required().label("Fullname"),
    email: Yup.string().required().email().label("Email"),
});

function CartForm() {
    const handleSubmit = (values) => {
        console.log(values);
    };
    return (
        <CartFormStyled>
            <Formik
                initialValues={{
                    fullname: "",
                    email: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ handleSubmit, handleChange, setFieldTouched, values, touched, errors }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail111">
                            <Form.Label>ФИО</Form.Label>
                            <Form.Control
                                type="text"
                                name="fullname"
                                value={values.fullname}
                                onChange={handleChange}
                                onBlur={() => setFieldTouched("fullname")}
                                isValid={touched.fullname && !errors.fullname}
                                isInvalid={touched.fullname ? errors.fullname : null}
                            />
                            <Form.Control.Feedback type="invalid">{errors.fullname}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail11dfd1">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="text"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={() => setFieldTouched("email")}
                                isValid={touched.email && !errors.email}
                                isInvalid={touched.email ? errors.email : null}
                            />
                            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik>
        </CartFormStyled>
    );
}

export default CartForm;
