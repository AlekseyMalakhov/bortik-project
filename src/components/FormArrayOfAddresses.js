import React, { useState } from "react";
import styled from "@emotion/styled";
import { FieldArray } from "formik";
import FormArrayInput from "./FormArrayInput";
import DeleteButton from "./DeleteButton";
import { useTranslation } from "react-i18next";
import DeleteAddressModal from "./DeleteAddressModal";
import Button from "react-bootstrap/Button";

const ArrayFieldRow = styled.div({
    display: "flex",
    width: "100%",
    alignItems: "center",
});

function FormArrayOfAddresses({ values }) {
    const [showAsk, setShowAsk] = useState(false);
    const [indexToDelete, setIndexToDelete] = useState(null);
    const { t } = useTranslation();

    const askToDelete = (index) => {
        setIndexToDelete(index);
        setShowAsk(true);
    };

    const removeAddress = (arrayHelpers) => {
        arrayHelpers.remove(indexToDelete);
        setShowAsk(false);
    };

    const OneButtonContainer = styled.div({
        display: "flex",
        justifyContent: "center",
        marginTop: "10px",
        marginBottom: "10px",
    });

    return (
        <FieldArray
            name="address"
            render={(arrayHelpers) => (
                <div>
                    {values.address && values.address.length > 0
                        ? values.address.map((address, index) => (
                              <ArrayFieldRow key={index}>
                                  <FormArrayInput
                                      name={`address.${index}.name`}
                                      rootName="address"
                                      index={index}
                                      label={t("Адрес доставки") + " " + (index + 1)}
                                  />
                                  <DeleteButton onClick={() => askToDelete(index)} />
                              </ArrayFieldRow>
                          ))
                        : null}
                    <OneButtonContainer>
                        <Button variant="primary" onClick={() => arrayHelpers.push({ id: Date.now(), name: "" })}>
                            {t("Добавить адрес")}
                        </Button>
                    </OneButtonContainer>
                    <DeleteAddressModal
                        show={showAsk}
                        indexToDelete={indexToDelete}
                        onHide={() => setShowAsk(false)}
                        onClean={() => removeAddress(arrayHelpers)}
                    />
                </div>
            )}
        />
    );
}

export default FormArrayOfAddresses;
