import React, { useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import CartPanel from "./components/CartPanel";
import styled from "@emotion/styled";
import handleScreenSize from "./settings/screenWidth";
import { getItems } from "./store/manage";
import { useDispatch } from "react-redux";

const AppStyled = styled.div({
    height: "100%",
});

const MyContainer = styled.div({
    position: "absolute",
    top: "50px",
    bottom: "0px",
    display: "flex",
    width: "100%",
});

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        handleScreenSize();
        dispatch(getItems());
    }, []);
    return (
        <AppStyled>
            <Header />
            <MyContainer>
                <Sidebar />
                <Main />
            </MyContainer>
            <CartPanel />
        </AppStyled>
    );
}

export default App;
