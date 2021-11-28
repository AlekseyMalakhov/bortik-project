import React from "react";
import styled from "@emotion/styled";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Formik } from "formik";
import * as Yup from "yup";
import FormInput from "../components/FormInput";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

const AccountStyled = styled.div({
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

const ButtonGroup = styled.div({
    display: "flex",
    justifyContent: "space-evenly",
    marginTop: "30px",
});

const validationSchema = Yup.object().shape({
    email: Yup.string().required("Укажите email").email("Укажите email"),
    password: Yup.string().required("Введите пароль"),
});

function Account() {
    const navigate = useNavigate();
    const handleSubmit = (values) => {
        console.log(values);
    };

    const cancel = () => {
        navigate("/");
    };
    return (
        <AccountStyled>
            <Title>Личный кабинет</Title>
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ handleSubmit }) => (
                    <Form noValidate onSubmit={handleSubmit} style={{ maxWidth: "400px", width: "100%" }}>
                        <FormInput name="email" label="Email*" inputMode="email" />
                        <FormInput name="password" label="Password*" type="password" />

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
        </AccountStyled>
    );
}

export default Account;
