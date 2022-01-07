import React from "react";
import { useFormikContext } from "formik";
import Form from "react-bootstrap/Form";

function FormSelect({ name, label, ...otherProps }) {
    const { setFieldValue, values } = useFormikContext();
    return (
        <Form.Group className="mb-3" controlId={"cart_form_" + [name]}>
            <Form.Label>{label}</Form.Label>
            <Form.Select name={name} value={values[name]} onChange={(e) => setFieldValue(name, e.target.value)} {...otherProps}>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </Form.Select>
        </Form.Group>
    );
}

export default FormSelect;
