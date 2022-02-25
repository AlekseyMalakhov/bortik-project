import React, { useState } from "react";
import styled from "@emotion/styled";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Formik } from "formik";
import * as Yup from "yup";
import FormInput from "../components/FormInput";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setLoading } from "../store/manage";
import adminAPI from "../api/admin";
import { setAdmin } from "../store/manage";

const LoginStyled = styled.div({
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

function AdminLogin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const validationSchema = Yup.object().shape({
        email: Yup.string().required("Укажите email").email("Укажите email"),
        password: Yup.string().required("Введите пароль"),
    });

    const handleSubmit = (values) => {
        setError("");
        dispatch(setLoading(true));
        adminAPI
            .loginAdmin(values)
            .then((response) => {
                dispatch(setLoading(false));
                console.log(response);
                if (response.status === 200) {
                    dispatch(setAdmin(response.data));
                    localStorage.setItem("admin", JSON.stringify(response.data));
                } else if (response.status === 401) {
                    setError("Неверный логин или пароль");
                } else {
                    setError("Неизвестная ошибка! Обратитесь в службу поддержки.");
                }
            })
            .catch((err) => {
                dispatch(setLoading(false));
                setError("Неизвестная ошибка! Обратитесь в службу поддержки.");
                console.log(err);
            });
    };

    const cancel = () => {
        navigate("/");
    };
    return (
        <LoginStyled>
            <Title>{"Панель администратора"}</Title>
            <Formik
                initialValues={{
                    email: process.env.NODE_ENV === "development" ? "admin@demo.com" : "",
                    password: process.env.NODE_ENV === "development" ? "admin" : "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ handleSubmit }) => (
                    <Form noValidate onSubmit={handleSubmit} style={{ maxWidth: "400px", width: "100%" }}>
                        <FormInput name="email" label="Email*" inputMode="email" />
                        <FormInput name="password" label={"Пароль*"} type="password" />

                        {error !== "" ? <Error>{error}</Error> : null}

                        <ButtonGroup>
                            <Button variant="outline-primary" onClick={cancel}>
                                {"Отмена"}
                            </Button>
                            <Button variant="primary" type="submit" style={{ width: "80px" }}>
                                {"Войти"}
                            </Button>
                        </ButtonGroup>
                    </Form>
                )}
            </Formik>
        </LoginStyled>
    );
}

export default AdminLogin;
