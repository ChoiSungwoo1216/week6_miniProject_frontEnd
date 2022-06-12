import React from "react";
import styled from "styled-components";
import {
    useSelector,
    // useDispatch 
} from "react-redux";
import { useNavigate } from "react-router-dom";
// import { deletepost } from "../redux/modules/post";

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
            console.log(i)
            if (tag === tag_list[i]) {
                console.log(tag)
                return true;
            }
        }

        if (tag === "") {
            return true;
        } else {
            return false;
        }
    }


    return (
        <Page>
            <div>
                <input type="text" ref={tag_ref} onChange={(e) => { setTag(e.target.value); }} placeholder="Tag를 입력하세요"
                    style={{ width: "50vw" }}
                />
            </div>
            <TagBox>
                {tag_lists.map((tag, idx) => {
                    return (
                        <button key={idx}
                            onClick={() => { setTag(tag_lists[idx]) }}
                        >
                            {tag_lists[idx]}
                        </button>
                    );
                })}
            </TagBox>
            <ListStyle>
                {post_lists.map((list, index) => {
                    return (
                        <div key={index}>
                            {searchTag(tagvalue, list.tag) ? (
                                <CardStyle onClick={() => {
                                    navigate("/post/" + list.postid);
                                }}>
                                    <NameDateEDBtn>
                                        <h5 style={{ fontStyle: " italic" }}> {list.user_nick}님의 게시물 <br /> {list.time}</h5>
                                        {is_login ? (
                                            <EDBtn>
                                                <button
                                                    onClick={() => {
                                                        navigate("/post/" + list.postid);
                                                    }}
                                                >수정하기</button>
                                                <button
                                                    onClick={() => {
                                                        // dispatch(deletepost({index}));
                                                        window.alert("삭제 완료");
                                                    }}
                                                >삭제하기</button>
                                            </EDBtn>
                                        ) : (null)
                                        }
                                    </NameDateEDBtn>
                                    <Img> {list.img_url} </Img>
                                    <div style={{ backgroundColor: "white", margin: "10px" }}>{list.title}</div>
                                    <div style={{ display: "flex", flexDirection: "row", gap: "10px", justifyContent: "center" }}>
                                        <FontAwesomeIcon icon="fa-heart" color="red" size="2x" />
                                        <div>{list.liked}</div>
                                        <FontAwesomeIcon icon="fa-message" size="2x" />
                                        <div>{list.comment_cnt}</div>
                                    </div>
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
                        <FontAwesomeIcon icon="fa-pen" color="gray" size="2x" />
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
margin-top: 100px;
padding-top: 20px;
`;

const ListStyle = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding: 20px;
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
width: calc((100vw -40px)/ 4);
background-color: #cfffaf;
margin : 20px auto;
padding: 0px 20px 20px 20px;
border: 2px solid blueviolet;
border-radius: 10px;
transition: box-shadow 300ms ease-in-out;
&:hover {
  box-shadow: rgba(0, 0, 0, 0.5) 0px 5px 15px 0px;
}
`;

const NameDateEDBtn = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
gap: 10px;
`;

const EDBtn = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
gap: 5px;
`;

const Img = styled.div`
width: 20vw;
height: 20vh;
background-color: white;
line-height: 20vh;
margin: auto;
`

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