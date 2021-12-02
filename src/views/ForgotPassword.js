import React, { useState } from "react";
import styled from "@emotion/styled";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import userAPI from "../api/user";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setLoading } from "../store/manage";

const ForgotPasswordStyled = styled.div({
    margin: "10px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
});

const Title = styled.div({
    margin: "10px 20px",
});

const Error = styled.div({
    color: "red",
    marginTop: "10px",
});

const MyInput = styled(Form.Control)({
    marginBottom: "10px",
    maxWidth: "300px",
});

function ForgotPassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [done, setDone] = useState(false);

    const send = () => {
        setError("");
        dispatch(setLoading(true));
        userAPI
            .forgotPassword({ email })
            .then((response) => {
                dispatch(setLoading(false));
                console.log(response);
                if (response.status === 200) {
                    setDone(true);
                } else if (response.status === 404 && response.data === "Email not found") {
                    setError(`Аккаунт ${email} не обнаружен!`);
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

    return (
        <ForgotPasswordStyled>
            <Title>Если Вы забыли пароль от своего аккаунта, введите свой email и мы пришлем Вам его.</Title>
            <div style={{ display: "flex", width: "100%", flexDirection: "column", alignItems: "center", marginTop: "20px" }}>
                <MyInput value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@example.com" />
                {error !== "" ? <Error>{error}</Error> : null}
                <Button variant="primary" style={{ marginTop: "20px" }} onClick={send}>
                    Отправить
                </Button>
            </div>
        </ForgotPasswordStyled>
    );
}

export default ForgotPassword;
