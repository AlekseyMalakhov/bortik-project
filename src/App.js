import React, { useEffect } from "react";
import Header from "./components/Header";
import styled from "@emotion/styled";
import handleScreenSize from "./settings/screenWidth";
import { getItems, setUser } from "./store/manage";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Cart from "./views/Cart";
import NoMatch from "./views/NoMatch";
import Loading from "./components/Loading";
import About from "./views/About";
import Login from "./views/Login";
import Account from "./views/Account";
import Register from "./views/Register";
import ForgotPassword from "./views/ForgotPassword";

const AppStyled = styled.div({
    height: "100%",
});

function App() {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.manage.loading);
    useEffect(() => {
        handleScreenSize();
        dispatch(getItems());
        const user = localStorage.getItem("user");
        if (user) {
            dispatch(setUser(JSON.parse(user)));
        }
    }, []);
    return (
        <AppStyled>
            <Header />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/account" element={<Account />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot_password" element={<ForgotPassword />} />
                <Route path="*" element={<NoMatch />} />
            </Routes>
            {loading ? <Loading /> : null}
        </AppStyled>
    );
}

export default App;
