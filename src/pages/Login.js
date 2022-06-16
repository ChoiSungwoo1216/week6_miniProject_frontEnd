import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import axios from "axios"
import loginPic from "../Img/loginPic.png"

const Login = () => {

    const navigate = useNavigate();

    // //작성 되었는지 확인
    const [id_check, setId] = React.useState("");
    const [pwd_check, setPwd] = React.useState("");

    // //로그인 용
    const id_ref = React.useRef("");
    const password_ref = React.useRef("");

    //axios
    const loginAxios = async () => {

        axios.defaults.withCredentials = true;
        axios(
            {
                url: "/user/login",
                method: "post",
                data: {
                    "email": id_check,
                    "password": pwd_check
                },
                baseURL: "http://52.78.217.50:8080",
            }
        )
            .then(response => {
                localStorage.setItem("user", response.config.data);
                localStorage.setItem("Authorization", response.headers.authorization);
                localStorage.setItem("RefreshToken", response.headers.refreshtoken);
                window.alert("로그인 완료");
                navigate("/");
            })
            .catch((response) => {
                console.log(response)
                window.alert(response.message)
            });
    }


    return (
        <WordDiv>
            <div>
                <img src={loginPic} />
            </div>
            <CardStyle>
                <Subtitle>로그인</Subtitle>
                <IdPwdTitle>아이디</IdPwdTitle>
                <Input>
                    <input type="text" ref={id_ref} style={{ width: "300px" }}
                        onChange={(e) => {
                            setId(e.target.value);
                        }}
                    />
                </Input>
                <IdPwdTitle>비밀번호</IdPwdTitle>
                <Input>
                    <input type="password" ref={password_ref} style={{ width: "300px" }}
                        onChange={(e) => {
                            setPwd(e.target.value);
                        }}
                    />
                </Input>
                <LoginBtn disabled={id_check === "" || pwd_check === ""
                    ? true : false} onClick={loginAxios}>로그인하기</LoginBtn>
            </CardStyle>
        </WordDiv>
    );
};

const WordDiv = styled.div`
max-width: 450px;
display: flex;
flex-direction: row;
gap: 100px;
align-items: center;
justify-content: center;
margin: 140px auto;
`;

const Subtitle = styled.div`
    width: 325px;
    height: 50px;
    font-size: 25px;
    font-weight: 600;
    text-align: center;
    margin-top: 25px;
`;

const CardStyle = styled.div`
margin: 10px auto;
padding: 10px;
border: 10px solid gray;
border-radius: 10px;
background-color: white;
`;

const IdPwdTitle = styled.h5`
text-decoration: underline;
margin: 0px auto;
`;

const Input = styled.div`
  width: 300px;
  height: 50px;
  margin: 10px auto;
  padding: 16px auto;
  display: flex;
  & input{
    border: 1px solid #888;
    width: 70%;
  }
  
  & input:focus {
    outline: none;
    border: 3px solid #888;
  }
`;

const LoginBtn = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 25px;
    margin-bottom: 20px;
    width: 100%;
    height: 50px;
    background-color: gray;
    color: white;
    font-size: 20px;
    font-weight: bold;

`;
export default Login;