import React from "react";
import { useFormikContext } from "formik";
import Form from "react-bootstrap/Form";

function FormSelect({ name, label, options, ...otherProps }) {
    const { setFieldValue, values } = useFormikContext();
    return (
        <Form.Group className="mb-3" controlId={"cart_form_" + [name]}>
            <Form.Label>{label}</Form.Label>
            <Form.Select name={name} value={values[name]} onChange={(e) => setFieldValue(name, e.target.value)} {...otherProps}>
                {options && options.length > 0
                    ? options.map((value) => (
                          <option value={value.name} key={value.id}>
                              {value.name}
                          </option>
                      ))
                    : null}
            </Form.Select>
        </Form.Group>
    );
}

export default FormSelect;
