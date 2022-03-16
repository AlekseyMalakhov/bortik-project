import React from "react";
import styled from "@emotion/styled";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AddRemove from "./AddRemove";
import { useTranslation } from "react-i18next";





const HistoryTableRowStyled = styled(Container)`
    position: relative;
    background-color: white;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 10px 10px;
    max-width: 1000px;
    border-radius: 8px;
`;

const MyRow = styled(Row)`
    justify-content: space-evenly;
    align-items: center;
`;

const BottomCol = styled(Col)({
    display: "flex",
    justifyContent: "center",
    "@media screen and (max-width: 768px)": {
        marginTop: "20px",
    },
});

const MyCol = styled(Col)`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    padding: 10px 10px;
    text-align: center;
`;
const DivPrs =styled.div`
padding-top: 3px;
    margin-bottom: auto;
    display: flex;
    max-width: 570px;
    align-content: flex-start;
    align-items: baseline;
`;
const RetailPrice = styled.div({
 
});

function HistoryTableRow({ item }) {
    const { t, i18n } = useTranslation();

    return (
        <HistoryTableRowStyled>
            <MyRow>
                {item.img ? (
                    <Col xs="auto" style={{margin: "auto"}}>
                        <img src={item.img} alt={""} width="80" height="80"></img>
                    </Col>
                ) : null}
                <MyCol style={{ fontWeight: "500",alignSelf: "flex-start",textAlign: "left",display:"block" }} >
                    {item.title[i18n.resolvedLanguage]}
                    <div style={{color:"#828282",paddingTop: "10px",fontSize: "small"}}> {item.article} </div>
                        
                    
                </MyCol>
                <DivPrs>
                <BottomCol >
                    <RetailPrice>{item.price} BYN</RetailPrice>  
                        
                    
                </BottomCol>

                <BottomCol style={{ fontWeight: "500", fontSize: "14px" }} >
                    {t("Количество")}: {item.number}
                </BottomCol>

                <BottomCol >
                    {item.price*item.number} BYN
                    </BottomCol>
                    </DivPrs>
            </MyRow>
        </HistoryTableRowStyled>
    );
}

export default HistoryTableRow;
