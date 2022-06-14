import React from "react";
import styled from "styled-components"

import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

// import axios from "axios";

import talking from "../Img/talking.PNG"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Post = () => {

    const single_lists = useSelector((state) => state.single.list);
    const [post_info, setPost] = React.useState([]);
  
    const navigate = useNavigate();

    const params = useParams();
    const post_id = params.postid;

    function find_index(e) {
        for (let i = 0; i < single_lists.length; i++) {
            if (e === single_lists[i].postid) {
                return i;
            }
        }
    };
    const index = find_index(post_id);

    //댓글

    const [com, setCom] = React.useState("");
    const [checkCmt, setcheckCmt] = React.useState(false)

    const addCmt = () => {
        if (!checkCmt) {
            setcheckCmt(true);
        } else {
            setcheckCmt(false);
        }
    }

    // const [like, setLike] = React.useState(false);

    //axios

    //포스트 정보 불러오기
    // const LoadInfoAxios = async () => {
    //     axios.defaults.withCredentials = true;
    //     axios(
    //         {
    //             url: "/user/login",
    //             method: "get",
    //             params: {
    //                 id: post_id,
    //             },
    //             baseURL: "http://52.78.217.50:8080",
    //         }
    //     )
    //         .then(response => {
    //             console.log(response);
    //             // setPost(response.data);
    //         })
    //         .catch((response) => { window.alert(response.response.data) });
    // }

    //댓글 추가
    // const addCmtAxios = async () => {
    //     axios.defaults.withCredentials = true;
    //     axios(
    //         {
    //             url: "/user/login",
    //             method: "post",
    //             data: {
    //                 "comment": com,
    //             },
    //             baseURL: "http://52.78.217.50:8080",
    //         },
    //         {
    //             headers: {
    //                 "Authorization": localStorage.getItem("Authorization"),
    //                 "Refreshtoken": localStorage.getItem("Refreshtoken")
    //             }
    //         }
    //     )
    //         .then(response => {
    //             console.log(response);
    //             window.alert("작성완료");
    //         })
    //         .catch((response) => {
    //             window.alert(response.response.data)
    //         })
    // }


    //댓글 삭제
        // const DelCmtAxios = async () => {
    //     axios.defaults.withCredentials = true;
    //     axios(
    //         {
    //             url: "/user/login",
    //             method: "delete",
    //             data: {
    //                 "comment": com,
    //             },
    //             baseURL: "http://52.78.217.50:8080",
    //         },
    //         {
    //             headers: {
    //                 "Authorization": localStorage.getItem("Authorization"),
    //                 "Refreshtoken": localStorage.getItem("Refreshtoken")
    //             }
    //         }
    //     )
    //         .then(response => {
    //             console.log(response);
    //             window.alert("삭제완료");
    //         })
    //         .catch((response) => {
    //             window.alert(response.response.data)
    //         })
    // }


    return (
        <CardStyleD>
            <Top>
                <PostTitle>{single_lists[index].title}</PostTitle>
                <EDBtn>
                    <FontAwesomeIcon icon="fa-pen-to-square" color="white" size="2x"
                        onClick={() => {
                            navigate("/postedit/" + post_id);
                        }}
                    />
                    <FontAwesomeIcon icon="fa-trash-can" color="white" size="2x"
                        onClick={() => {
                            window.alert("삭제 완료");
                        }}
                    />
                </EDBtn>
            </Top>
            <Rowlayer>
                <ImgTxtDiv>
                    {(single_lists[index].up_text_layer === "") ? (null) : (
                        <Ballon>{single_lists[index].up_text_value}</Ballon>
                    )}
                    <ImgInputed src={single_lists[index].img_url} style={{ marign: "0px", padding: "0px" }} />
                    {(single_lists[index].down_text_layer === "") ? (null) : (
                        <Ballon>{single_lists[index].down_text_value}</Ballon>
                    )}
                </ImgTxtDiv>
                <div>
                    <InfoTitle>
                        <h5 style={{ fontStyle: " italic", color: "white", marginTop: "0px" }}>{single_lists[index].user_nick}님의 게시물 {single_lists[index].time}</h5>
                    </InfoTitle>

                    <TotalComment>
                        {single_lists[index].comment_list.map((list, idx) => {
                            return (
                                <CommentDiv >
                                    <Comment>
                                        <div style={{ margin: "5px" }}>{list.comment}</div>
                                        <h5 style={{ marginBottom: "0px", marginTop: "10px" }}>{list.user_nick} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; {list.time}</h5>
                                    </Comment>
                                        <FontAwesomeIcon icon="fa-trash-can" color="black"
                                            onClick={() => {
                                                // dispatch(deletepost({index}));
                                                window.alert("삭제 완료");
                                            }}
                                        />
                                </CommentDiv>
                            );
                        })
                        }
                    </TotalComment>
                    <AddCmt>
                        {checkCmt ? (
                            <Cmt>
                                <CmtInput
                                    type="text"
                                    value={com}
                                    placeholder="댓글을 작성하세요"
                                    onChange={(e) => {
                                        e.preventDefault();
                                        setCom(e.target.value);
                                    }}
                                />
                                <CmtBtn>
                                    <FontAwesomeIcon icon="fa-circle-check" color="white" size="2x" 
                                    // onClick={addCmtAxios}
                                    />
                                </CmtBtn>
                            </Cmt>
                        ): (null)}
                        <FontAwesomeIcon icon="fa-comment-medical" color="white" size="3x"
                            onClick={addCmt}
                        />
                    </AddCmt>

                    {/* 좋아요 표시 
                    <div>
                        {like ? (
                            <div style={{display:"flex", flexDirection:"row"}}>
                                <Like style={{ color: "red" }} onClick={() => { setLike(false) }}>
                                    ❤
                                </Like>
                                <h3 style={{color:"white", margin:"0 auto", lineHeight:"65px"}}>{single_lists[index].liked}</h3>
                            </div>
                        ) : (
                            <div style={{display:"flex", flexDirection:"row"}}>
                                <Like onClick={() => { setLike(true) }}>
                                    🤍
                                </Like>
                                <h1 style={{color:"white", margin:"0 auto", lineHeight:"65px"}}>{single_lists[index].liked}</h1>
                            </div>
                        )
                        }
                        <div style={{ color: "white" }}></div>
                    </div> */}
                </div>
            </Rowlayer>
            <ReturnBtn>
                <FontAwesomeIcon icon="fa-arrow-rotate-left" color="white" size="2x" onClick={() => { navigate("/") }} />
            </ReturnBtn>
        </CardStyleD>
    );
}

const AddCmt = styled.div`
margin-top: 20px;
display: flex;
flex-direction: row;
justify-content: center;
margin: 20px auto;
`;

const Cmt = styled.div`
display: flex;
flex-direction: row;
align-items: center;
border: 1px solid white;
width: 80%;
padding-left: 10px;
margin-right: 40px;
`;

const CmtInput = styled.input`
height: 70%;
width: 90%;
text-align: center;
`;

const CmtBtn = styled.div`
margin: auto 10px;
`;

const Top = styled.div`
display: flex;
flex-direction: row;
margin: 10px auto;
`;

const ReturnBtn = styled.div`
margin-left: 90%;
transition: transform 300ms ease-in-out;
&:hover {
  transform: rotate(-360deg);
}
`;

const TotalComment = styled.div`
width: 30vw;
height: 50vh;
margin: 0px auto;
padding: 10px;
border: 5px solid white;
border-radius: 5px;
overflow-y: auto;
`;

const CommentDiv = styled.div`
display: flex;
flex-direction: row;
border-radius: 10px;
background-color: white;
margin: 10px;
padding: 5px;
`;

const Comment = styled.div`
width: 95%;
`;

const PostTitle = styled.div`
background-color: transparent;
margin: 10px auto;
width: 80%;
height: 50px;
line-height: 50px;
color: white;
font-family: "Dokdo";
font-size: 70px;
`;

const ImgInputed = styled.img`
width: 339px;
height: 345px;
border: 3px solid white;
background-color: white;
`;

const Ballon = styled.div`
background-image: url(${talking});
width: 345px;
height: 150px;
line-height: 150px;
font-size: 35px;
font-weight: 600;
`;

const ImgTxtDiv = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
width: 50%;
margin: 0px;
`;


const CardStyleD = styled.div`
margin: 100px auto 20px auto;
width: 80vw;
background: rgba(0, 0, 0, 0.5);
padding: 20px;
border: 2px solid gray;
border-radius: 10px;
`;

const InfoTitle = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
gap: 10px;
margin-top: 0px;
`;

const EDBtn = styled.div`
display: flex;
flex-direction: row;
gap: 20px;
`;

const Rowlayer = styled.div`
display: flex;
flex-direction: row;
width: 100%;
gap: 10px;
margin: 0px auto;
`;



// const Like = styled.div`
// width: 50px;
// height: 50px;
// font-size: 45px;
// margin: 0px auto;

// transition: transform 300ms ease-in-out;
// &:hover {
//   font-size: 50px;
// }
// `;

// const Columnlayer = styled.div`
// display: flex;
// flex-direction: column;
// align-items: center;
// `;

// const ColImg = styled.img`
// width: 60vw;
// height: 60vh;
// object-fit: cover;
// `;

// const ColTxt = styled.div`
// width: 60vw;
// height: 20vh;
// line-height: 20vh;
// margin: 20px;
// background-color: white;
// `;

export default Post;