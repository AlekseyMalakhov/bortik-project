import React, { useState } from "react";
import styled from "@emotion/styled";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Formik } from "formik";
import * as Yup from "yup";
import FormInput from "../components/FormInput";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setLoading } from "../store/manage";
import userAPI from "../api/user";
import { setUser } from "../store/manage";

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

const validationSchema = Yup.object().shape({
    email: Yup.string().required("Укажите email").email("Укажите email"),
    password: Yup.string().required("Введите пароль"),
});

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleSubmit = (values) => {
        console.log(values);
        setError("");
        dispatch(setLoading(true));
        userAPI
            .login(values)
            .then((response) => {
                dispatch(setLoading(false));
                console.log(response);
                if (response.status === 200) {
                    console.log(response);
                    dispatch(setUser(response.data));
                    navigate("/account");
                    //setShowDone("OK");
                } else {
                    setError("Неверный логин или пароль");
                    console.log("error");
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
            <Title>Вход в личный кабинет</Title>
            <Formik
                initialValues={{
                    email: process.env.NODE_ENV === "development" ? "www1@www.ww" : "",
                    password: process.env.NODE_ENV === "development" ? "12345" : "",
                    // email: "",
                    // password: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ handleSubmit }) => (
                    <Form noValidate onSubmit={handleSubmit} style={{ maxWidth: "400px", width: "100%" }}>
                        <FormInput name="email" label="Email*" inputMode="email" />
                        <FormInput name="password" label="Password*" type="password" />

                        {error !== "" ? <Error>{error}</Error> : null}

                        <div style={{ marginBottom: "10px" }}>
                            <Link to="/forget_password">Забыл пароль</Link>
                        </div>
                        <div>
                            <Link to="/register">Зарегистрироваться</Link>
                        </div>

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
        </LoginStyled>
    );
}

export default Login;
