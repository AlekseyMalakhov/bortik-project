import React from "react";
import styled from "@emotion/styled";
import { FieldArray } from "formik";
import FormArrayInput from "./FormArrayInput";
import DeleteButton from "./DeleteButton";
import { useTranslation } from "react-i18next";

const ArrayFieldRow = styled.div({
    display: "flex",
    width: "100%",
});

function FormArrayOfAddresses({ values }) {
    const { t } = useTranslation();
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
                                  <DeleteButton onClick={() => arrayHelpers.remove(index)} />
                              </ArrayFieldRow>
                          ))
                        : null}
                    <button type="button" onClick={() => arrayHelpers.push({ id: Date.now(), name: "" })}>
                        {t("Добавить адрес")}
                    </button>
                </div>
            )}
        />
    );
}

export default FormArrayOfAddresses;
