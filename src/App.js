import React, { useEffect } from "react";
import Header from "./components/Header";
import styled from "@emotion/styled";
import handleScreenSize from "./settings/screenWidth";
import { getItems } from "./store/manage";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";

const AppStyled = styled.div({
    height: "100%",
});

const Cart = () => {
    return <div>Fuck</div>;
};

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        handleScreenSize();
        dispatch(getItems());
    }, []);
    return (
        <AppStyled>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
            </Routes>
        </AppStyled>
    );
}

export default App;
