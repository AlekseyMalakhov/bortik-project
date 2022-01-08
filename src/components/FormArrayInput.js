import React from "react";
import { useFormikContext } from "formik";
import Form from "react-bootstrap/Form";

function FormArrayInput({ name, rootName, index, label, ...otherProps }) {
    const { setFieldTouched, setFieldValue, errors, touched, values } = useFormikContext();
    return (
        <Form.Group className="mb-3" controlId={"cart_form_" + [name]} style={{ width: "100%" }}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                as="textarea"
                type="text"
                name={name}
                value={values[rootName][index].name}
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

export default FormArrayInput;
