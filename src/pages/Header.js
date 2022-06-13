import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { logout, getCurrentUser} from "../axios/login";

// font-awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

import gunma from "../Img/gunma.PNG"

const Header = () => {
    const navigate = useNavigate();

    // const getUserInfo =() =>{
    //     return axios.get("url" + "user", {headers: authHeader() });
    // };
    // const isAdmin =() =>{
    //     return axios.get("url" + "admin", {headers: authHeader() });
    // };
    //로그인 확인
    const [is_login
        // , setIsLogin
    ] = React.useState(false);

    // const loginCheck = async (user) => {
    //     if (user) {
    //         setIsLogin(true);
    //     } else {
    //         setIsLogin(false);
    //     }
    // }

    return (
        <HeaderContainer>
            <HomeBtn>
                <FontAwesomeIcon icon="fa-house" size="2x" onClick={() => { navigate("/") }} />
            </HomeBtn>
            <Title>짤태식이 돌아왔구나?!</Title>
            <Gunma src={gunma} />

            <AboutLogin>
                {is_login ? (
                    <div>
                    {/* <Btn onClick={logout()}/> */}
                    </div>
                ) : (
                    <div>
                        <Btn style={{ margin: "10px" }} onClick={() => { navigate("/login") }} >로그인</Btn>
                        <Btn onClick={() => { navigate("/signup") }} >회원가입</Btn>
                    </div>
                )}
            </AboutLogin>
        </HeaderContainer>
    );
};

const HeaderContainer = styled.div`
position: fixed;
top: 0;
left: 0;
z-index: 10;
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height: 70px;
background-color: white;
border-bottom: 4px solid black;
`;

const HomeBtn = styled.div`
position: fixed;
top: 20px;
left: 40px;
`;

const Title = styled.h1`
color: black;
text-align: center;
font-size: 50px;
font-family: 'Song Myung', serif;
`;

const Gunma = styled.img`
width:80px;
height:50px;
margin-left:10px;
border-radius:20px;
`;

const AboutLogin = styled.div`
position: fixed;
top: 10px;
right: 20px;
`;

const Btn = styled.button`
background: transparent;
border-radius: 3px;
border: 1px solid black;
color: black;
padding: 0.25em 0.55em;
font-size: 15px;
`;



export default Header;