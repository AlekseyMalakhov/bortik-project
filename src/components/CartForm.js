import React from "react";
import styled from "@emotion/styled";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Formik } from "formik";
import * as Yup from "yup";
import FormInput from "./FormInput";
import itemsAPI from "../api/items";
import FormCheckBox from "./FormCheckBox";

const CartFormStyled = styled.div({
    marginTop: "30px",
});

const CheckGroup = styled.div({
    marginTop: "30px",
});

const payment_methods = [
    {
        id: 1,
        label: "Безналичный расчет (для юридических лиц)",
        value: "сashless",
    },
    {
        id: 2,
        label: "Наличными",
        value: "cash",
    },
    {
        id: 3,
        label: "Банковской картой (только при самовывозе)",
        value: "cardUpon",
    },
    {
        id: 4,
        label: "Банковский перевод по реквизитам",
        value: "cardOnline",
    },
];

const delivery_methods = [
    {
        id: 1,
        label: "по Минску",
        value: "Minsk",
    },
    {
        id: 2,
        label: "по Беларуси",
        value: "Belarus",
    },
    {
        id: 3,
        label: "Самовывоз",
        value: "pickup",
    },
];

const validationSchema = Yup.object().shape({
    name_user: Yup.string().required("Укажите имя"),
    email: Yup.string().required("Укажите email").email("Укажите email"),
    phone: Yup.string()
        .matches(/\+\d{5}\d+/, "Укажите телефон")
        .required("Укажите телефон"),
});

function CartForm({ cart }) {
    const handleSubmit = (values) => {
        console.log(values);
        console.log(cart);
        const formData = new FormData();

        for (let x in values) {
            formData.append(x, values[x]);
        }
        console.log(formData);
        itemsAPI
            .sendCart(formData)
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <CartFormStyled>
            <Formik
                initialValues={{
                    name_user: "test",
                    email: "test@test.com",
                    phone: "+375111222333",
                    payment_method: "сashless",
                    delivery: "Minsk",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ handleSubmit, handleChange }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <FormInput name="name_user" label="ФИО*" />
                        <FormInput name="phone" label="Телефон*" inputMode="numeric" placeholder={"+375xxxxxxxxx"} />
                        <FormInput name="email" label="Email*" />
                        <CheckGroup>
                            <Form.Label>Способ оплаты:</Form.Label>
                            {payment_methods.map((method) => (
                                <FormCheckBox name="payment_method" label={method.label} value={method.value} key={method.id} />
                            ))}
                        </CheckGroup>
                        <CheckGroup>
                            <Form.Label>Доставка:</Form.Label>
                            {delivery_methods.map((method) => (
                                <FormCheckBox name="delivery" label={method.label} value={method.value} key={method.id} />
                            ))}
                        </CheckGroup>
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
