import React from "react";
import { useFormikContext } from "formik";
import Form from "react-bootstrap/Form";

function FormInput({ name, label, formGroupStyle, ...otherProps }) {
    const { setFieldTouched, setFieldValue, errors, touched, values } = useFormikContext();
    return (
        <Form.Group className="mb-3" controlId={"cart_form_" + [name]} style={formGroupStyle}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                type="text"
                name={name}
                value={values[name]}
                onChange={(e) => setFieldValue(name, e.target.value)}
                onBlur={() => setFieldTouched(name)}
                isValid={touched[name] && !errors[name]}
                isInvalid={touched[name] ? errors[name] : null}
                {...otherProps}
            />
            <Form.Control.Feedback type="invalid">{errors[name]}</Form.Control.Feedback>
        </Form.Group>
    );
}

export default FormInput;
