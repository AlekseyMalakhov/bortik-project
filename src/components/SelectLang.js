import React, { useEffect } from "react";
import styled from "@emotion/styled";
import Dropdown from "react-bootstrap/Dropdown";
import SelectLangText from "./SelectLangText";
import { useTranslation } from "react-i18next";
import chatURL from "../settings/chatURL";

const MyDropdown = styled(Dropdown)({
    paddingLeft: "16px",
    paddingTop: "5px",
    paddingBottom: "5px",
    "&:hover": {
        backgroundColor: "#e9ecef",
    },
});

const langs = [
    {
        code: "ru",
        name: "Русский (RU)",
    },
    {
        code: "zh",
        name: "中文 (ZH)",
    },
    {
        code: "en",
        name: "English (EN)",
    },
];

const getFontWeight = (selectedLang, code) => {
    if (selectedLang === code && selectedLang === "zh") {
        return "bold";
    }
    if (selectedLang === code) {
        return "500";
    }
    return "normal";
};

function SelectLang() {
    const { t, i18n } = useTranslation();

    const loadChat = () => {
        const tidioScript = document.createElement("script");
        tidioScript.src = chatURL;
        document.body.appendChild(tidioScript);
    };

    useEffect(() => {
        document.tidioChatLang = i18n.resolvedLanguage;
        //loadChat();
    }, []);

    const deleteChat = () => {
        const chatEl_1 = document.getElementById("tidio-chat-code");
        chatEl_1.remove();
        const chatEl_2 = document.getElementById("tidio-chat");
        chatEl_2.remove();
    };

    const changeLang = (lang) => {
        i18n.changeLanguage(lang);
        document.tidioChatLang = lang;
        //deleteChat();
        //loadChat();
    };
    return (
        <MyDropdown align="end" drop="down">
            <Dropdown.Toggle as={SelectLangText} id="select-lang" />
            <Dropdown.Menu>
                {langs.map((lang) => (
                    <Dropdown.Item
                        key={lang.code}
                        onClick={() => changeLang(lang.code)}
                        style={{ fontWeight: getFontWeight(i18n.resolvedLanguage, lang.code) }}
                    >
                        {lang.name}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </MyDropdown>
    );
}

export default SelectLang;
