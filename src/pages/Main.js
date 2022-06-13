import React from "react";
import styled from "styled-components";
import {
    useSelector,
    // useDispatch 
} from "react-redux";
import { useNavigate } from "react-router-dom";
// import { deletepost } from "../redux/modules/post";

//axios
import axios from "axios";

// font-awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";




const Main = () => {

    const post_lists = useSelector((state) => state.post.list);
    const tag_lists = useSelector((state) => state.post.tag);
    const navigate = useNavigate();
    // const dispatch = useDispatch();

    //로그인이 되어 있는지 확인
    // const [is_login
    //     , setIsLogin
    // ] = React.useState(true);
    const is_login = true;
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
    const [tagvalue, setTag] = React.useState("")
    const tag_ref = React.useRef(null);

    function searchTag(tag, tag_list) {
        for (let i = 0; i < tag_list.length; i++) {

            if (tag === tag_list[i]) {

                return true;
            }
        }

        if (tag === "") {
            return true;
        } else {
            return false;
        }
    }



    //axios
    // const loadPostList = async () => {
    //     axios({
    //         method: "get",
    //         url: "http://localhost:5001/post_list"

    //     }).then(response => {
    //         console.log(response);
    //     });


    // }
    // const loadCommentList = async () => {
    //     axios.get("http://localhost:5001/comment_list").then(respose => {
    //         console.log(respose);
    //     });
    // }

    // const addCommentList = async () => {

    //     axios.post("http://localhost:5001/comment_list",
    //         {
    //             "post_id": "number1",
    //             "comment": "댓글4",
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
    //     loadPostList();
    //     loadCommentList();
    // });

    return (
        <Page>
            <div>
                <TagSearch type="text" ref={tag_ref} onChange={(e) => { setTag(e.target.value); }} placeholder="Tag를 입력하세요" />
            </div>
            <TagBox>
                {tag_lists.map((tag, idx) => {
                    return (
                        <TagBtn key={idx}
                            onClick={() => { setTag(tag_lists[idx]) }}
                        >
                            {tag_lists[idx]}
                        </TagBtn>
                    );
                })}
            </TagBox>
            <ListStyle>
                {post_lists.map((list, index) => {
                    return (
                        <div key={index}>
                            {searchTag(tagvalue, list.tag) ? (
                                <CardStyle >
                                    <ImgDiv
                                        onClick={() => {
                                            navigate("/post/" + list.postid);
                                        }}
                                    >
                                        <Img src={list.img_url} alt={list.img_url} />
                                    </ImgDiv>
                                    <CardTitle>{list.title}</CardTitle>
                                    <CardInfo >
                                        <FontAwesomeIcon icon="fa-heart" color="red" size="2x" />
                                        <Cnt>{list.liked}</Cnt>
                                        <h5 style={{ fontStyle: " italic", color:"white" }}> {list.user_nick}님의 게시물 <br /> {list.time}</h5>

                                        <FontAwesomeIcon icon="fa-comment-dots" color="white" size="2x" />
                                        <Cnt>{list.comment_cnt}</Cnt>
                                    </CardInfo>
                                    <ExtraDiv>
                                        <TagDiv>
                                            {list.tag.map((t,i)=>{
                                                return(
                                                    <SmallTag>{list.tag[i]}</SmallTag>
                                                );
                                            })}
                                        </TagDiv>
                                        {is_login ? (
                                            <EDBtn>
                                                <FontAwesomeIcon icon="fa-pen-to-square" color="white" size="x"
                                                    onClick={() => {
                                                        navigate("/postedit/" + list.postid);
                                                    }}
                                                />
                                                 <FontAwesomeIcon icon="fa-trash-can" color="white" size="x"
                                                    onClick={() => {
                                                        // dispatch(deletepost({index}));
                                                        window.alert("삭제 완료");
                                                    }}
                                                />
                                            </EDBtn>
                                        ) : (null)
                                        }
                                    </ExtraDiv>
                                </CardStyle>
                            ) : (null)}
                        </div>

                    );
                })}

            </ListStyle>      {
                is_login ? (

                    <AddBtn onClick={() => {
                        navigate("/posting");
                    }}>
                        <FontAwesomeIcon icon="fa-pen" color="lightgray" size="2x" />
                    </AddBtn>
                ) : (
                    (null)
                )
            }
        </Page >
    )
}

const Page = styled.div`
width: 100vw;
margin-top: 70px;
padding-top: 20px;
`;

const ListStyle = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding: 20px;
    justify-content: center;
  overflow-x: hidden;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const TagBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 70vw;
    margin: 10px auto;
    gap: 10px;
`;



//

const CardStyle = styled.div`
position: relative;
align-items: center;
justify-content: center;
min-width: 300px;
width: calc((100vw -40px) / 5);
background: rgba(0, 0, 0, 0.5);
margin : 0px auto;
padding: 0px 20px 20px 20px;
border: 2px solid #3a3a3a;
border-radius: 10px;
transition: box-shadow 300ms ease-in-out;
&:hover {
  box-shadow: rgba(0, 0, 0, 0.7) 0px 15px 15px 0px;
}
`;

const TagSearch = styled.input`
text-align: center;
width: 30vw;
height: 25px;
`;

const TagBtn = styled.button`
background: white;
border-radius: 5px;
border: 1px solid black;
color: black;
padding: 0.25em 0.55em;
font-size: 15px;
font-family: 'Gothic A1', sans-serif;
`;

const ExtraDiv = styled.div`
display: flex;
flex-direction: row;
`;

const EDBtn = styled.div`
align-items: center;
display: flex;
flex-direction: row;
gap: 15px;
margin-left: calc(100% - 170px);
`;

const Img = styled.img`
width: 100%;
height: 300px;
background-color: white;
margin: 20px auto;
object-fit: cover;
`

const ImgDiv = styled.div`
width: 100%;
height: 300px;
background-color: white;
margin: 20px auto;
`

const CardTitle = styled.div`
background-color: transparent;
margin: 10px auto;
width: 100%;
height: 30px;
line-height: 32px;
color: white;
font-family: "Dokdo";
font-size: 32px;
border:1px solid white;
`;

const CardInfo =styled.div`
display: flex;
flex-direction: row;
gap: 20px;
align-items: center;
justify-content: center;
margin: 10px auto;
`;

const Cnt = styled.div`
    color: white;
    height: 30px;
    line-height: 30px;
    margin: 0;
`;

const TagDiv = styled.div`
display:flex;
flex-direction: row;
gap:10px;
margin: 10px;
`;

const SmallTag = styled.div`
padding: 3px;
background-color: orange;
border: 1px solid black;
border-radius: 3px;
`;
//

const AddBtn = styled.div`

position: fixed;
bottom: 5vh;
right: 5vw;

transition: transform 300ms ease-in-out;
&:hover {
  transform: rotate(360deg);
}
`;

export default Main;