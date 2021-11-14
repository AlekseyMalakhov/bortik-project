import React from "react";
//import { Counter } from "./components/counter/Counter";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";

const AppStyled = styled.div({
    height: "100%",
});

function App() {
    const sideBarOpened = useSelector((state) => state.manage.sideBarOpened);

    return (
        <AppStyled>
            <Header />
            {sideBarOpened ? <Sidebar /> : null}
            {/* <Counter /> */}
        </AppStyled>
    );
}

export default App;
