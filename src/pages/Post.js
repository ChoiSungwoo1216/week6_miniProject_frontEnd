import React from "react";
import styled from "styled-components"

import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";

import { loadsingle, addsingle } from "../redux/modules/single";



//이미지
import talking from "../Img/talking.PNG"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Post = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const post_lists = useSelector((state) => state.post.list);
    const comment_lists = useSelector((state) => state.single.list);

    const [cmt_lists, setCmtList] = React.useState(comment_lists);
    console.log(cmt_lists);

    const params = useParams();
    const post_id = params.id;

    function find_index(e) {
        for (let i = 0; i < post_lists.length; i++) {
            if (parseInt(e) === post_lists[i].id) {
                return i;
            }
        }
    };

    const index = find_index(post_id);

    const type = "help"

    React.useEffect(() => {
        dispatch(LoadCmtAxios(type));
    }, [dispatch, type])

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


    //axios

    //게시글 삭제
    const DelPostAxios = () => {
        return async function () {
            axios.defaults.withCredentials = true;
            await axios(
                {
                    url: "/deleteMyPage/" + post_id,
                    method: "delete",
                    baseURL: "http://52.78.217.50:8080",
                    headers: {
                        "Authorization": localStorage.getItem("Authorization"),
                        "Refreshtoken": localStorage.getItem("Refreshtoken")
                    }
                }
            )
                .then(response => {
                    console.log(response);
                    window.alert("삭제완료");
                    navigate("/");
                })
                .catch((response) => {
                    if (response.response.data.reLogin === true) {
                        window.alert("다시 로그인 해주세요")
                    } else {
                        window.alert(response.message)
                    }
                })
        }
    }



    //댓글 가져오기

    const LoadCmtAxios = () => {
        axios.defaults.withCredentials = true;
        return async function (dispatch) {
            await axios(
                {
                    url: "/post/getCommentsByPostId",
                    method: "get",
                    params: {
                        "postId": post_id,
                    },
                    baseURL: "http://52.78.217.50:8080",
                }
            )
                .then(response => {
                    console.log(response)
                    setCmtList(response.data)
                    dispatch(loadsingle(response.data))

                })
                .catch((response) => {
                    if (!response) {
                        window.alert("Error: Network Error");
                    } else {
                        window.alert(response.message)
                    }
                });
        }
    }


    //  댓글 추가
    const addComAxios = async () => {
        axios.defaults.withCredentials = true;
        axios(
            {
                url: "/post/comments",
                method: "post",
                data: {
                    "postId": post_id,
                    "comment": com,
                },
                baseURL: "http://52.78.217.50:8080",
                headers: {
                    "Authorization": localStorage.getItem("Authorization"),
                    "RefreshToken": localStorage.getItem("RefreshToken")
                }
            }
        )
            .then(response => {
                console.log(response);
                dispatch(addsingle({
                    comment: com,
                    nickname: localStorage.getItem("user").nickname,
                }))
                navigate("/");
                window.alert(response.data);
            })
            .catch((response) => {
                if (response.response.data.reLogin === true) {
                    window.alert("다시 로그인 해주세요")
                } else {
                    window.alert(response.message)
                }
            })
    }


    //댓글 삭제
    const DelCmtAxios = (id) => {
        return async function () {
            axios.defaults.withCredentials = true;
            console.log(id)
            await axios(
                {
                    url: "/post/commentDelete",
                    method: "post",
                    data: {
                        "postId": post_id,
                        "commentId": id,
                    },
                    baseURL: "http://52.78.217.50:8080",
                    headers: {
                        "Authorization": localStorage.getItem("Authorization"),
                        "Refreshtoken": localStorage.getItem("Refreshtoken")
                    }
                }
            )
                .then(response => {
                    console.log(response);
                    window.alert("삭제완료");
                    navigate("/");
                })
                .catch((response) => {
                    if (response.response.data.reLogin === true) {
                        window.alert("다시 로그인 해주세요")
                    } else {
                        window.alert(response.message)
                    }
                })
        }
    };



    return (
        <CardStyleD>
            <Top>
                <PostTitle>{post_lists[index].title}</PostTitle>
                <EDBtn>
                    <FontAwesomeIcon icon="fa-pen-to-square" color="white" size="2x"
                        onClick={() => {
                            navigate("/postedit/" + post_id);
                        }}
                    />
                    <FontAwesomeIcon icon="fa-trash-can" color="white" size="2x"
                        onClick={
                            dispatch(DelPostAxios)
                        }
                    />
                </EDBtn>
            </Top>
            <Rowlayer>
                <ImgTxtDiv>
                    {(post_lists[index].up_layer_value === "") ? (null) : (
                        <Ballon>{post_lists[index].up_txt}</Ballon>
                    )}
                    <ImgInputed src={post_lists[index].imgUrl} style={{ marign: "0px", padding: "0px" }} />
                    {(post_lists[index].down_layer_value === "") ? (null) : (
                        <Ballon>{post_lists[index].down_txt}</Ballon>
                    )}
                </ImgTxtDiv>
                <div>
                    <InfoTitle>
                        <h5 style={{ fontStyle: " italic", color: "white", marginTop: "0px" }}>{post_lists[index].nickname}님의 게시물</h5>
                        <FontAwesomeIcon icon="fa-comment-dots" color="white" size="2x" />
                    </InfoTitle>
                    <TotalComment>
                        {cmt_lists.length === 0 ? (
                            <div style={{ color: "white", width: "100%", height: "100%" }}>No Comment</div>
                        ) : (
                            <div>
                                {cmt_lists.map((list, idx) => {
                                    // cmt_lists
                                    return (
                                        <CommentDiv key={idx} >
                                            <Comment>
                                                <div style={{ margin: "5px" }}>{list.content}</div>
                                                <h5 style={{ marginBottom: "0px", marginTop: "10px" }}>{list.nickname}</h5>
                                                <h5>{list.createdAt}</h5>
                                            </Comment>
                                            <FontAwesomeIcon icon="fa-trash-can" color="black" onClick={DelCmtAxios(cmt_lists[idx].id)} />
                                        </CommentDiv>
                                    );
                                })
                                }
                            </div>
                        )}
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
                                        onClick={addComAxios}
                                    />
                                </CmtBtn>
                            </Cmt>
                        ) : (null)}
                        <FontAwesomeIcon icon="fa-comment-medical" color="white" size="3x"
                            onClick={addCmt}
                        />
                    </AddCmt>
                    <TagDiv>
                        {post_lists[index].tagList.map((t, i) => {
                            return (
                                <SmallTag key={i}>{post_lists[index].tagList[i].tag}</SmallTag>
                            );
                        })}
                    </TagDiv>
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

const TagDiv = styled.div`
display:flex;
flex-wrap: wrap;
gap:10px;
margin:0px auto;
align-items: center;
justify-content: center;
`;

const SmallTag = styled.div`
background-color: orange;
border: 1px solid black;
border-radius: 5px;
width: 119.3px;
height: 30px;
line-height: 30px;
font-size: 20px;
font-weight: 600;
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
overflow-y: scroll;
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

export default Post;



    // const addCmtRedux = () => {
    //     dispatch(
    //         editpost({
    //             commentCnt: (parseInt(post_lists[index].commentCnt) + 1)
    //         }, index))
    //     dispatch(
    //         addsingle(
    //             {
    //                 comment: com,
    //                 nickname: "작성자"
    //                 // localStorage.getItem("user").nickname
    //                 ,
    //             })
    //     );
    // };

    // const delCmtRedux = (idx) => {
    //     dispatch(
    //         editpost({ "commentCnt": (post_lists[index].commentCnt - 1) }, index));
    //     dispatch(
    //         deletesingle({ idx })
    //     );
    //     window.alert("삭제 완료");
    // }


    // const [like, setLike] = React.useState(false);