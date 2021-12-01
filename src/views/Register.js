import React, { useState } from "react";
import styled from "@emotion/styled";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Formik } from "formik";
import * as Yup from "yup";
import FormInput from "../components/FormInput";
import { useNavigate } from "react-router";

const RegisterStyled = styled.div({
    margin: "10px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
});

const Title = styled.div({
    textAlign: "center",
    margin: "20px 10px",
    fontSize: "20px",
    fontWeight: "500",
});

const Error = styled.div({
    color: "red",
    marginBottom: "10px",
});

const ButtonGroup = styled.div({
    display: "flex",
    justifyContent: "space-evenly",
    marginTop: "30px",
});

const validationSchema = Yup.object().shape({
    email: Yup.string().required("Укажите email").email("Укажите email"),
    password: Yup.string().required("Введите пароль"),
    repeatPassword: Yup.string().required("Введите пароль"),
});

function Register() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const handleSubmit = (values) => {
        console.log(values);
    };

    const cancel = () => {
        navigate("/");
    };

    return (
        <RegisterStyled>
            <Title>Регистрация</Title>
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                    repeatPassword: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ handleSubmit }) => (
                    <Form noValidate onSubmit={handleSubmit} style={{ maxWidth: "400px", width: "100%" }}>
                        <FormInput name="email" label="Email*" inputMode="email" />
                        <FormInput name="password" label="Пароль*" type="password" />
                        <FormInput name="repeatPassword" label="Повторите пароль*" type="password" />

                        {error !== "" ? <Error>{error}</Error> : null}

                        <ButtonGroup>
                            <Button variant="outline-primary" onClick={cancel}>
                                Отмена
                            </Button>
                            <Button variant="primary" type="submit">
                                Отправить
                            </Button>
                        </ButtonGroup>
                    </Form>
                )}
            </Formik>
        </RegisterStyled>
    );
}

export default Register;
