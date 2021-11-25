import React from "react";
import { useFormikContext } from "formik";
import Form from "react-bootstrap/Form";

function FormCheckBox({ name, label, value, ...otherProps }) {
    const { setFieldValue, values } = useFormikContext();
    return (
        <Form.Check
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

export default FormCheckBox;
