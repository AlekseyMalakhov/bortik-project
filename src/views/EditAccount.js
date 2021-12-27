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
import AccountEditedModal from "../components/AccountEditedModal";
import { useSelector } from "react-redux";
import FormCheckBoxSwitch from "../components/FormCheckBoxSwitch";
import { useTranslation } from "react-i18next";

const EditAccountStyled = styled.div({
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
    marginTop: "10px",
    marginBottom: "10px",
});

const PasswordGroup = styled.div({
    marginTop: "20px",
});

const ButtonGroup = styled.div({
    display: "flex",
    justifyContent: "space-evenly",
    marginTop: "30px",
    marginBottom: "30px",
});

function EditAccount() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.manage.user);
    const [error, setError] = useState("");
    const [done, setDone] = useState(false);
    const [updatedUser, setUpdatedUser] = useState(null);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required(t("Укажите имя")),
        phone: Yup.string().required(t("Укажите телефон")),
        email: Yup.string().required(t("Укажите email")).email(t("Укажите email")),
        changePassword: Yup.boolean(),
        password: Yup.string().required(t("Введите пароль")),
        newPassword: Yup.string().when("changePassword", { is: true, then: Yup.string().required(t("Введите пароль")) }),
        repeatNewPassword: Yup.string().when("changePassword", { is: true, then: Yup.string().required(t("Введите пароль")) }),
    });

    const handleSubmit = (values) => {
        if (values.changePassword && values.newPassword !== values.repeatNewPassword) {
            setError(t("Пароль и повтор пароля не совпадают!"));
            return;
        }
        let data;
        if (values.changePassword) {
            data = { ...values };
            delete data.repeatNewPassword;
            delete data.changePassword;
        } else {
            data = {
                name: values.name,
                phone: values.phone,
                email: values.email,
                address: values.address,
                password: values.password,
            };
        }
        setError("");
        dispatch(setLoading(true));
        userAPI
            .editAccount(data, user.id)
            .then((response) => {
                dispatch(setLoading(false));
                if (response.status === 200) {
                    const updatedUser = { ...data };
                    delete updatedUser.password;
                    if (updatedUser.newPassword) {
                        delete updatedUser.newPassword;
                    }
                    updatedUser.id = user.id;
                    setUpdatedUser(updatedUser);
                    setDone(true);
                } else if (response.status === 401) {
                    setError(t("Неверный пароль"));
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
        navigate("/account");
    };

    return (
        <EditAccountStyled>
            <Title>{t("Редактировать личные данные")}</Title>
            {user ? (
                <Formik
                    initialValues={{
                        name: user.name,
                        phone: user.phone,
                        email: user.email,
                        address: user.address ? user.address : "",
                        password: "",
                        changePassword: false,
                        newPassword: "",
                        repeatNewPassword: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ handleSubmit, values }) => (
                        <Form noValidate onSubmit={handleSubmit} style={{ maxWidth: "400px", width: "100%" }}>
                            <FormInput name="name" label={t("ФИО") + "*"} />
                            <FormInput name="phone" label={t("Телефон") + "*"} inputMode="tel" placeholder={"+375xxxxxxxxx"} />
                            <FormInput name="email" label="Email*" inputMode="email" />
                            <FormInput name="address" label={t("Адрес доставки по умолчанию")} />
                            <FormInput name="password" label={values.changePassword ? t("Текущий пароль*") : t("Пароль") + "*"} type="password" />
                            {error !== "" ? <Error>{error}</Error> : null}

                            <FormCheckBoxSwitch name="changePassword" label={t("Изменить пароль")} />
                            {values.changePassword ? (
                                <PasswordGroup>
                                    <FormInput name="newPassword" label={t("Новый пароль*")} type="password" />
                                    <FormInput name="repeatNewPassword" label={t("Повторите новый пароль*")} type="password" />
                                </PasswordGroup>
                            ) : null}

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
            ) : null}
            <AccountEditedModal show={done} onHide={() => setDone(false)} backdrop="static" keyboard={false} updatedUser={updatedUser} />
        </EditAccountStyled>
    );
}

export default EditAccount;
