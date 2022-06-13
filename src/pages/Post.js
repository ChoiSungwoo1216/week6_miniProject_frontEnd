import React from "react";
import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import talking from "../Img/talking.PNG"

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

            <InfoTitle>
                <h5 style={{ fontStyle: " italic" }}>{single_lists[index].user_nick}님의 게시물 <br /> {single_lists[index].time}</h5>
                {/* {user_check(index, user) ? ( */}
                <EDBtn>
                    <button onClick={() => { navigate("/postedit/" + post_id) }}>수정하기</button>
                    <button
                    // onClick={() => {
                    //     dispatch(deletePostFB(single_lists[index].id));
                    //     window.alert("삭제 완료");
                    //     navigate("/");
                    // }}
                    >삭제하기</button>
                </EDBtn>
                {/* ) : (null) */}
                {/* } */}
            </InfoTitle>
            {/* {
                `${single_lists[index].layer}` === "leftText"
                    ? (
                        <Rowlayer>
                            <RowTxt>{post_lists[index].explanation}</RowTxt>
                            <RowImg src={post_lists[index].image_url} alt="업로드 사진" />
                        </Rowlayer>
                    ) : (null)
            } */}
            {/* {
                `${post_lists[index].layer}` === "rightText"
                    ? ( */}
            <Rowlayer>
                {/* <RowImg src={single_lists[index].img_url} alt="업로드 사진" /> */}
                <div>
                    <ImgTxtDiv>
                        <TxtDiv>
                            {(single_lists[index].up_text_layer === "") ? (null) : (
                                <Ballon>{single_lists[index].up_text_value}</Ballon>
                            )}
                            <ImgInputed src={single_lists[index].img_url} style={{ marign: "0px", padding: "0px" }} />
                            {(single_lists[index].down_text_layer === "") ? (null) : (
                                <Ballon>{single_lists[index].down_text_value}</Ballon>
                            )}
                        </TxtDiv>
                    </ImgTxtDiv>

                    {like ? (
                        <Like style={{ color: "red" }} onClick={() => { setLike(false) }}>
                            ❤
                        </Like>
                    ) : (
                        <Like onClick={() => { setLike(true) }}>
                            🤍
                        </Like>
                    )
                    }
                </div>
                <div style={{ width: "30vw", height: "50vh", margin: "0px auto" }}>
                    {single_lists[index].comment_list.map((list, idx) => {
                        return (
                            <div style={{ border: "1px solid black", margin: "10px" }}>
                                <div>{list.comment}</div>
                                <div>{list.time}</div>
                            </div>
                        );
                    })
                    }
                    {/* <button onClick={addCommentList}>댓글 작성하기</button> */}
                </div>
            </Rowlayer>
            {/* )
                    : (null)
            } */}
            {/* {
                `${post_lists[index].layer}` === "downText"
                    ? (
                        <Columnlayer>
                            <ColImg src={post_lists[index].image_url} alt="업로드 사진" />
                            <ColTxt > {post_lists[index].explanation} </ColTxt >
                        </Columnlayer>)
                    : (null)
            }
            <br /> */}
            <button onClick={() => { navigate("/") }}>돌아가기</button>
        </CardStyleD>
    );
}

const PostTitle = styled.div`
background-color: transparent;
margin: 10px auto;
width: 80%;
height: 50px;
line-height: 50px;
color: white;
font-family: "Dokdo";
font-size: 100px;
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
border: 2px solid blueviolet;
border-radius: 10px;
`;

const InfoTitle = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
gap: 10px;
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
margin: 0px;
padding: 0px;
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
font-size: 15px;


&:hover {
  font-size: large;
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