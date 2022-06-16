import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// import { auth, db } from "../shared/firebase";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { collection, addDoc } from "firebase/firestore";
import { emailCheck, passwordCheck, DoubleCheck } from "../shared/Validation";

import peace from "../Img/peace.jpg"

import axios from "axios";


const SignUp = () => {

    const navigate = useNavigate();

    // // Ref
    const new_nick_ref = React.useRef(null);
    const new_id_ref = React.useRef(null);
    const new_password_ref = React.useRef(null);
    const new_password_ref_check = React.useRef(null);

    // // 작성 여부
    const [nick_write, setNW] = React.useState("");
    const [id_write, setIW] = React.useState("");
    const [pwd_write, setPW] = React.useState("");
    const [pwd_check_write, setPCW] = React.useState("");

    // // 유효성 검사
    const [id_check, setId] = React.useState(false);
    const [pwd_check, setPwd] = React.useState(false);
    const [pwd_double_check, setPwdCheck] = React.useState(false);


    const signupAxios = async () => {
        // // 이메일 양식 확인
        // if (!emailCheck(new_id_ref.current.value)) {
        //     setId(true);
        //     window.alert("이메일 형식이 맞지 않습니다.");
        // };
        // // 비밀번호 양식 확인
        // if (!passwordCheck(new_password_ref.current.value)) {
        //     setPwd(true);
        //     window.alert("비밀번호 양식이 틀렸습니다!")
        // }
        // // 비밀번호 확인 
        // if (!DoubleCheck(new_password_ref.current.value, new_password_ref_check.current.value)) {
        //     setPwdCheck(true);
        //     window.alert("비밀번호 확인이 틀렸습니다!")
        // }
        // // 양식이 다 맞다면 회원가입 성공시키기
        // if (
        //     emailCheck(new_id_ref.current.value) &&
        //     passwordCheck(new_password_ref.current.value) &&
        //     DoubleCheck(new_password_ref.current.value, new_password_ref_check.current.value)
        // ) {
        axios.defaults.withCredentials = true;
        axios(
            {
                url: "/user/signup",
                method: "post",
                data: {
                    nickname: nick_write,
                    email: id_write,
                    password: pwd_write
                },
                baseURL: "http://52.78.217.50:8080",
            }
        )
            .then(response => {
                console.log(response);
            })
            .catch((response) => { window.alert(response.respose.data) });
        window.alert("회원가입 완료");
        navigate("/login")
    }

    return (
        <WordDiv>
            <div>
                <img src={peace}/>
            </div>
            <CardStyle>
            <Subtitle>회원가입하기</Subtitle>
                <SmallTitle>닉네임</SmallTitle>
                <Input>
                    <input
                        type="text"
                        ref={new_nick_ref}
                        style={{ width: "100%" }} placeholder="ex)홍길동"
                        onChange={(e) => {
                            setNW(e.target.value);
                        }}
                    />
                </Input>
                <SmallTitle>이메일</SmallTitle>
                <Input>
                    <input
                        type="text"
                        ref={new_id_ref}
                        style={{ width: "100%" }}
                        placeholder="ex)abe@naver.com"
                        onChange={(e) => {
                            setIW(e.target.value);
                        }}
                    />
                </Input>

                {id_check ? (
                    <ErrorGuide>올바른 형식의 이메일을 작성해 주십시요.</ErrorGuide>
                ) : (null)
                }

                <SmallTitle>비밀번호</SmallTitle>
                <Input>
                    <input
                        type="password"
                        ref={new_password_ref}
                        style={{ width: "100%" }}
                        placeholder="비밀번호 8글자 이상 작성해주세요"
                        onChange={(e) => {
                            setPW(e.target.value);
                        }}
                    />
                </Input>

                {pwd_check ? (
                    <ErrorGuide>올바른 비밀번호를 작성해 주십시요.</ErrorGuide>
                ) : (null)
                }

                <SmallTitle>비밀번호 확인</SmallTitle>
                <Input>
                    <input
                        type="password"
                        ref={new_password_ref_check}
                        style={{ width: "100%" }}
                        placeholder="비밀번호와 같은 값을 입력해주세요."
                        onChange={(e) => {
                            setPCW(e.target.value);
                        }}
                    />
                </Input>

                {pwd_double_check ? (
                    <ErrorGuide>비밀번호가 일치하지 않습니다.</ErrorGuide>
                ) : (null)
                }

                {nick_write === "" && id_write === "" && pwd_write === "" && pwd_check_write === ""
                    ? (null) : (
                        <AddWordBtn onClick={signupAxios}>가입하기</AddWordBtn>
                    )
                }
            </CardStyle>
        </WordDiv>
    );
};

const WordDiv = styled.div`
max-width: 450px;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
gap: 50px;
margin: 150px auto;
`;

const Subtitle = styled.div`
    width: 325px;
    height: 50px;
    font-size: 25px;
    font-weight: 600;
    text-align: center;
    margin-top: 25px;
    color: #383838;
    text-decoration: underline #383838;
`;

const CardStyle = styled.div`
margin: 10px;
padding: 10px;
border: 10px solid gray;
border-radius: 10px;
background-color: white;
`;

const SmallTitle = styled.h5`
text-decoration: underline;
margin: 10px auto;
`;

const ErrorGuide = styled.h5`
margin: 0px auto; 
color: red;
`;

const Input = styled.div`
width: 300px;
  height: 50px;
  margin: 10px auto;
  padding: 10px auto;
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

const AddWordBtn = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 25px;
    margin-bottom: 20px;
    width: 100%;
    height: 50px;
    background-color: #673ab7;
    color: white;
    font-size: 20px;
    font-weight: bold;

`;
export default SignUp;