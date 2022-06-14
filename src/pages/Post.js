import React from "react";
import styled from "styled-components"

import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import talking from "../Img/talking.PNG"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


// import axios from "axios"

// import { deletePostFB } from "../redux/modules/post";

const Post = () => {
    //Post리스트와 이전에서 넘겨받은 index useParams로 바음
    // const dispatch = useDispatch();
    const single_lists = useSelector((state) => state.single.list);
    const params = useParams();
    const navigate = useNavigate();


    const post_id = params.postid;

    function find_index(e) {
        for (let i = 0; i < single_lists.length; i++) {
            if (e === single_lists[i].postid) {
                return i;
            }
        }
    };
    const index = find_index(post_id);

    const [like, setLike] = React.useState(false);

    //axios
    // const addCommentList = async () => {

    //     axios.post("http://localhost:5001/comment_list",
    //         {
    //             "post_id": "number1",
    //             "comment": "댓글5",
    //             "time": "2022-06-12 18:33"
    //         },
    //         {
    //             headers: {
    //                 'Content-type': 'application/json',
    //                 'Accept': 'application/json'
    //             }
    //         }
    //     )
    //     .then(response => {
    //         console.log(response); })
    //         .catch((response)=>{console.log("Error!")});
    // }

    // React.useEffect(() => {
    //     addCommentList();
    // });

    //작성자와 유저가 동일한지 확인
    //   const auth = getAuth();
    //   const user = auth.currentUser;


    //   const user_check = (index, user) => {
    //     if (user) {
    //       if (user.email === post_lists[index].user_id) {
    //         return true;
    //       } else {
    //         return false;
    //       }
    //     } else {
    //       return false;
    //     }
    //   }

    return (
        <CardStyleD>
            <PostTitle>{single_lists[index].title}</PostTitle>

            <Rowlayer>
                {/* <RowImg src={single_lists[index].img_url} alt="업로드 사진" /> */}

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
                        <h5 style={{ fontStyle: " italic", color: "white", marginTop:"0px"}}>{single_lists[index].user_nick}님의 게시물 {single_lists[index].time}</h5>
                        {/* {user_check(index, user) ? ( */}
                        <EDBtn>
                            <FontAwesomeIcon icon="fa-pen-to-square" color="white" size="x"
                                onClick={() => {
                                    navigate("/postedit/" + post_id);
                                }}
                            />
                            <FontAwesomeIcon icon="fa-trash-can" color="white" size="x"
                                onClick={() => {
                                    // dispatch(deletepost({index}));
                                    window.alert("삭제 완료");
                                }}
                            />
                        </EDBtn>
                        {/* ) : (null) */}
                        {/* } */}
                    </InfoTitle>

                    <div style={{ borderRadius:"5px",border: "5x solid white", width: "30vw", height: "50vh", margin: "0px auto", padding:"10px" }}>
                        {single_lists[index].comment_list.map((list, idx) => {
                            return (
                                <CommentDiv >
                                    <div style={{ margin: "5px" }}>{list.comment}</div>
                                    <h5 style={{ marginBottom: "0px", marginTop: "10px" }}>{list.user_nick} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; {list.time}</h5>
                                </CommentDiv>
                            );
                        })
                        }
                        {/* <button onClick={addCommentList}>댓글 작성하기</button> */}
                    </div>
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
                    </div>
                </div>
            </Rowlayer>
            <ReturnBtn>
            <FontAwesomeIcon icon="fa-arrow-rotate-left" color="white" size="2x" onClick={() => { navigate("/") }}/>
            </ReturnBtn>
        </CardStyleD>
    );
}


const ReturnBtn = styled.div`
margin-left: 90%;
transition: transform 300ms ease-in-out;
&:hover {
  transform: rotate(-360deg);
}
`;


const CommentDiv = styled.div`
border-radius: 10px;
background-color: white;
margin: 10px;
padding: 5px;
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

width: 50%;
margin: 0px auto;
`;

const TxtDiv = styled.div`
/* height: 70%; */
display: flex;
flex-direction: column;
margin: 10px auto;
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
align-items: center;
gap: 10px;
`;

const Rowlayer = styled.div`
display: flex;
flex-direction: row;
width: 100%;
gap: 10px;
margin: 0px auto;
`;

const RowImg = styled.img`
width: 40vw;
height: 40vh;
object-fit: cover;
`;

const RowTxt = styled.div`
width: 40vw;
height: 40vh;
line-height: 40vh;
background-color: white;
`;



const Like = styled.div`
width: 50px;
height: 50px;
font-size: 45px;
margin: 0px auto;

transition: transform 300ms ease-in-out;
&:hover {
  font-size: 50px;
}
`;

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