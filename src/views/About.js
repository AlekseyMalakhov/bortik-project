import React from "react";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";

const AboutStyled = styled.div({
    margin: "10px 20px",
    display: "flex",
    flexDirection: "column",
});

const Title = styled.div({
    textAlign: "center",
    margin: "20px 10px",
    fontSize: "20px",
    fontWeight: "500",
});

function About() {
    const { t } = useTranslation();
    return (
        <AboutStyled>
            <Title>{t("О компании")}</Title>
            <div>
                <p>
                    <span style={{ fontWeight: "500" }}>5A.com</span> - {t("about1")}
                </p>
                <p>{t("about2")}</p>
            </div>
        </AboutStyled>
    );
}

export default About;
