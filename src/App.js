import React, { useEffect } from "react";
import Header from "./components/Header";
import styled from "@emotion/styled";
import handleScreenSize from "./settings/screenWidth";
import { getItems } from "./store/manage";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Cart from "./views/Cart";
import NoMatch from "./views/NoMatch";
import Loading from "./components/Loading";

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
            <Loading />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="*" element={<NoMatch />} />
            </Routes>
        </AppStyled>
    );
}

export default App;
