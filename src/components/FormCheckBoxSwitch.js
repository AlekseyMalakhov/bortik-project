import React from "react";
import { useFormikContext } from "formik";
import Form from "react-bootstrap/Form";
import styled from "@emotion/styled";

const CheckStyled = styled(Form.Check)({
    "& label": {
        cursor: "pointer",
    },
});

function FormCheckBoxSwitch({ name, label, ...otherProps }) {
    const { handleChange } = useFormikContext();
    return (
        <React.Fragment>
            <CheckStyled name={name} label={label} type="switch" id={"switch_" + name} onChange={handleChange} />
        </React.Fragment>
    );
}

export default FormCheckBoxSwitch;
