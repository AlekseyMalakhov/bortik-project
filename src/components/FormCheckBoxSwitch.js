import React from "react";
import { useFormikContext } from "formik";
import Form from "react-bootstrap/Form";
import styled from "@emotion/styled";

const CheckStyled = styled(Form.Check)({
    "& label": {
        cursor: "pointer",
    },
});

function FormCheckBoxSwitch({ name, label, value, ...otherProps }) {
    const { values, handleChange } = useFormikContext();
    return (
        <React.Fragment>
            <CheckStyled name={name} label={label} type="switch" id={"switch_" + value} onChange={handleChange} />
        </React.Fragment>
    );
}

export default FormCheckBoxSwitch;
