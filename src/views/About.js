import React from "react";
import styled from "@emotion/styled";

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
    return (
        <AboutStyled>
            <Title>О компании</Title>
            <div>
                <p>
                    <span style={{ fontWeight: "500" }}>5A.com</span> - молодая и динамично развивающаяся компания, которая за короткое время сумела
                    занять прочное место среди ведущих поставщиков хозяйственных товаров в Беларуси.
                </p>
                <p>Залог нашего успеха - ответственность и внимательный подход к каждому клиенту.</p>
            </div>
        </AboutStyled>
    );
}

export default About;
