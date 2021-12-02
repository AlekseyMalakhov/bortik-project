import React from "react";
import { useFormikContext } from "formik";
import Form from "react-bootstrap/Form";
import styled from "@emotion/styled";

const CheckStyled = styled(Form.Check)({
    "& label": {
        cursor: "pointer",
    },
});

function FormCheckBoxRadio({ name, label, value, ...otherProps }) {
    const { setFieldValue, values } = useFormikContext();
    return (
        <CheckStyled
            name={name}
            label={label}
            type="radio"
            id={"payment_" + value}
            value={value}
            checked={values[name] === value}
            onChange={(e) => setFieldValue(name, value)}
        />
    );
}

export default FormCheckBoxRadio;
