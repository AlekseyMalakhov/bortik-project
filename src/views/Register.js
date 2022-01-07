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
import userAPI from "../api/user";
import AccountCreatedModal from "../components/AccountCreatedModal";
import { useTranslation } from "react-i18next";

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
    marginBottom: "30px",
});

function Register() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [done, setDone] = useState(false);
    const [newUser, setNewUser] = useState(null);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required(t("Укажите имя")),
        phone: Yup.string().required(t("Укажите телефон")),
        email: Yup.string().required(t("Укажите email")).email(t("Укажите email")),
        password: Yup.string().required(t("Введите пароль")),
        repeatPassword: Yup.string().required(t("Введите пароль")),
    });

    const handleSubmit = (values) => {
        if (values.password !== values.repeatPassword) {
            setError(t("Пароль и повтор пароля не совпадают!"));
            return;
        }
        const addressArr = JSON.stringify([values.address]);
        const newUser = { ...values };
        newUser.address = addressArr;
        setError("");
        dispatch(setLoading(true));
        userAPI
            .createAccount(newUser)
            .then((response) => {
                dispatch(setLoading(false));
                if (response.status === 201) {
                    const user = { ...newUser, id: response.data.userID };
                    user.address = [values.address];
                    setNewUser(user);
                    setDone(true);
                } else if (response.status === 409) {
                    setError(t("Данный email уже зарегистрирован!"));
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
        <RegisterStyled>
            <Title>{t("Регистрация")}</Title>
            <Formik
                initialValues={{
                    name: "",
                    phone: "",
                    email: "",
                    password: "",
                    repeatPassword: "",
                    address: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ handleSubmit }) => (
                    <Form noValidate onSubmit={handleSubmit} style={{ maxWidth: "400px", width: "100%" }}>
                        <FormInput name="name" label={t("ФИО") + "*"} />
                        <FormInput name="phone" label={t("Телефон") + "*"} inputMode="tel" placeholder={"+375xxxxxxxxx"} />
                        <FormInput name="email" label="Email*" inputMode="email" />
                        <FormInput name="password" label={t("Пароль") + "*"} type="password" />
                        <FormInput name="repeatPassword" label={t("Повторите пароль") + "*"} type="password" />
                        <FormInput name="address" label={t("Адрес доставки по умолчанию")} />

                        {error !== "" ? <Error>{error}</Error> : null}

                        <ButtonGroup>
                            <Button variant="outline-primary" onClick={cancel}>
                                {t("Отмена")}
                            </Button>
                            <Button variant="primary" type="submit">
                                {t("Отправить")}
                            </Button>
                        </ButtonGroup>
                    </Form>
                )}
            </Formik>
            <AccountCreatedModal show={done} onHide={() => setDone(false)} backdrop="static" keyboard={false} newUser={newUser} />
        </RegisterStyled>
    );
}

export default Register;
