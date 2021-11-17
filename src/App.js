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

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        handleScreenSize();
        dispatch(getItems());
    }, []);
    return (
        <AppStyled>
            <Header />
            <Main />
            <Sidebar />
            <CartPanel />
        </AppStyled>
    );
}

export default App;
