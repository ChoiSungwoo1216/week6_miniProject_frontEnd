import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// font-awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import { auth } from "../shared/firebase";
// import { onAuthStateChanged, signOut } from 'firebase/auth';


const Header = () => {
    const navigate = useNavigate();

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

    // React.useEffect(() => {
    //     onAuthStateChanged(auth, loginCheck);
    // })

    return (
        <HeaderContainer>
            <HomeBtn>
                <FontAwesomeIcon icon="fa-house" size="2x" onClick={() => { navigate("/") }} />
            </HomeBtn>
            <Title> 짤태식이 돌아왔구나 </Title>
            <AboutLogin>
                {is_login ? (
                    <div>
                    <FontAwesomeIcon icon="fa-door-open" size="2x"/>
                    <FontAwesomeIcon icon="fa-door-closed" size="2x"/>
                    </div>
                ) : (
                    <div>
                        <button style={{ margin: "10px" }} onClick={() => { navigate("/login") }} class="button is-info">로그인하기</button>
                        <button onClick={() => { navigate("/signup") }} class="button is-info">회원가입하기</button>
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
      flex-direction: row;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100px;
      background-color: #ececec;
      border-bottom: 2px solid blueviolet;
`;

const HomeBtn = styled.div`
position: fixed;
top: 30px;
left: 40px;
`;

const Title = styled.h1`
    color: deeppink;
    text-align: center;
    font-size: 50px;
    font-family: 'Song Myung', serif;
`;

const AboutLogin = styled.div`
position: fixed;
top: 40px;
right: 20px;
`;

export default Header;