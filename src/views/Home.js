import React from "react";
import styled from "@emotion/styled";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";
import CartPanel from "../components/CartPanel";

const MyContainer = styled.div({
    background: "#f5f5f6",
    
    position: "absolute",
    top: "50px",
    bottom: "0px",
    display: "flex",
    width: "100%",
});

const Home = () => {
    return (
        <React.Fragment>
            <MyContainer>
                <Sidebar />
                <Main />
            </MyContainer>
            <CartPanel />
        </React.Fragment>
    );
};

export default Home;
