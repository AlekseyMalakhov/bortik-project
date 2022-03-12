import React from "react";
import styled from "@emotion/styled";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";
import CartPanel from "../components/CartPanel";
import { useSelector } from "react-redux";






const MyContainer = styled.div(()=> {

    const antonAnton = useSelector((state) => state.manage.antonAnton)


    if (antonAnton){
        
        return{
            height: "-webkit-fill-available",
            height: "100%",
            background: "#f5f5f6",
            position: "absolute",
            width: "100%",
            bottom: "0px",
            display: "flex",
            // display: "-webkit-box",
            // display: "-webkit-flex",
            // display: "-ms-flexbox,"
            
            
        }
    }
    else
    
    return{
        
        background: "#f5f5f6",
        position: "absolute",
        top: "51px",
        bottom: "0px",
        display: "flex",
        width: "100%",
    }
  

   

});

function click() {

    if (localStorage.getItem('themeA')){
        localStorage.removeItem('themeA');
       
    }
    else {
        localStorage.setItem('themeA','tinderA')}

}

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
