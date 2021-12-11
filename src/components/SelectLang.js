import React from "react";
import styled from "@emotion/styled";
import Dropdown from "react-bootstrap/Dropdown";
import SelectLangText from "./SelectLangText";
import { useTranslation, Trans } from "react-i18next";

const MyDropdown = styled(Dropdown)({
    paddingLeft: "16px",
});

function SelectLang() {
    const { t, i18n } = useTranslation();
    return (
        <MyDropdown align="end" drop="start">
            <Dropdown.Toggle as={SelectLangText} id="select-lang" />
            <Dropdown.Menu>
                <Dropdown.Item onClick={() => i18n.changeLanguage("ru")}>Русский (RU)</Dropdown.Item>
                <Dropdown.Item onClick={() => i18n.changeLanguage("zh")}>中文 (ZH)</Dropdown.Item>
                <Dropdown.Item onClick={() => i18n.changeLanguage("en")}>English (EN)</Dropdown.Item>
            </Dropdown.Menu>
        </MyDropdown>
    );
}

export default SelectLang;
