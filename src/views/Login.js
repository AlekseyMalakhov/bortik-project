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
import { setUser, getHistory } from "../store/manage";
import { useTranslation } from "react-i18next";

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

function Login() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const validationSchema = Yup.object().shape({
        email: Yup.string().required(t("Укажите email")).email(t("Укажите email")),
        password: Yup.string().required(t("Введите пароль")),
    });

    const handleSubmit = (values) => {
        setError("");
        dispatch(setLoading(true));
        userAPI
            .login(values)
            .then((response) => {
                dispatch(setLoading(false));
                if (response.status === 200) {
                    dispatch(setUser(response.data));
                    localStorage.setItem("user", JSON.stringify(response.data));
                    navigate("/account");
                    dispatch(getHistory(response.data.id));
                } else if (response.status === 401) {
                    setError(t("Неверный логин или пароль"));
                } else {
                    setError(t("Неизвестная ошибка! Обратитесь в службу поддержки."));
                }
            })
            .catch((err) => {
                dispatch(setLoading(false));
                setError(t("Неизвестная ошибка! Обратитесь в службу поддержки."));
                console.log(err);
            });
    };

    const cancel = () => {
        navigate("/");
    };
    return (
        <LoginStyled>
            <Title>{t("Вход в личный кабинет")}</Title>
            <Formik
                initialValues={{
                    email: process.env.NODE_ENV === "development" ? "www1@www.ww" : "",
                    password: process.env.NODE_ENV === "development" ? "12345" : "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ handleSubmit }) => (
                    <Form noValidate onSubmit={handleSubmit} style={{ maxWidth: "400px", width: "100%" }}>
                        <FormInput name="email" label="Email*" inputMode="email" />
                        <FormInput name="password" label={t("Пароль") + "*"} type="password" />

                        {error !== "" ? <Error>{error}</Error> : null}

                        <div style={{ marginBottom: "10px" }}>
                            <Link to="/forgot_password">{t("Забыл пароль")}</Link>
                        </div>
                        <div>
                            <Link to="/register">{t("Зарегистрироваться")}</Link>
                        </div>

                        <ButtonGroup>
                            <Button variant="outline-primary" onClick={cancel}>
                                {t("Отмена")}
                            </Button>
                            <Button variant="primary" type="submit" style={{ width: "80px" }}>
                                {t("Войти")}
                            </Button>
                        </ButtonGroup>
                    </Form>
                )}
            </Formik>
        </LoginStyled>
    );
}

export default Login;
