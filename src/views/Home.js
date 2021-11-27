import React from "react";
import styled from "@emotion/styled";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";
import CartPanel from "../components/CartPanel";
import { useSelector } from "react-redux";

const MyContainer = styled.div(({ mobileScreen }) => {
    return {
        position: "absolute",
        top: "50px",
        bottom: mobileScreen ? "40px" : "80px",
        display: "flex",
        width: "100%",
    };
});

const Home = () => {
    const mobileScreen = useSelector((state) => state.manage.mobileScreen);
    return (
        <React.Fragment>
            <MyContainer mobileScreen={mobileScreen}>
                <Sidebar mobileScreen={mobileScreen} />
                <Main mobileScreen={mobileScreen} />
            </MyContainer>
            <CartPanel />
        </React.Fragment>
    );
};

export default Home;
