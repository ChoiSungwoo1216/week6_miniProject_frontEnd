import React from "react";
import styled from "styled-components";
import {
    useSelector,
    // useDispatch 
} from "react-redux";
import { useNavigate } from "react-router-dom";

//axios
// import axios from "axios";

// font-awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";




const Main = () => {
    //Hook
    const navigate = useNavigate();
    // const dispatch = useDispatch();

    //리덕스 연습
    const post_lists = useSelector((state) => state.post.list);
    console.log(post_lists);
    const tag_lists = useSelector((state) => state.post.tag);

    // Post 전체 목록
    // const [post_list, setList] = React.useState([]);
    // console.log(post_list);

    //Tag 목록
    const [lists, setLists] = React.useState(post_lists);

    //Tag 창 
    const [open, setOpen] = React.useState(false);

    // 로컬스토리지
    const user = localStorage.getItem("user")


    //로그인 확인
    // const is_login = true;
    const [is_login, setIsLogin] = React.useState(false);

    const loginCheck = async (user) => {
        if (user) {
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
    }

    React.useEffect(() => {
        loginCheck(user);
    })

    //Tag 검색
    // const [tagvalue, setTag] = React.useState("")

    // function searchTag(tag, tag_list) {
    //     for (let i = 0; i < tag_list.length; i++) {
    //         if (tag === tag_list[i]) {
    //             return true;
    //         }
    //     }
    //     if (tag === "") {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    // React.useEffect(() => {
    //     loadPostList();
    //     loadCommentList();
    // });


    //axios
    // const LoadPostAxios = async () => {
    //     axios.defaults.withCredentials = true;
    //     axios(
    //         {
    //             url: "/post/all",
    //             method: "GET",
    //             baseURL: "http://52.78.217.50:8080",
    //         }
    //     )
    //         .then(response => {
    //             console.log(response.data);
    //             // setList(response.data);
    //         })
    //         .catch((response) => {
    //             if (!response) {
    //                 window.alert("Error: Network Error");
    //             } else {
    //                 window.alert("요청실패")
    //             }
    //         });
    // }


    //Tag 요청
    // const [tlist, setTlist] = React.useState([]);
    // const ByTag = (e) => {
    //     e.preventDefault();
    //     if (tlist === null || tlist === []) {
    //         setTlist(post_list);
    //     } else {
    //         axios.defaults.withCredentials = true;
    //         axios(
    //             {
    //                 url: "/tag",
    //                 method: "post",
    //                 data: {
    //                     "tag": e,
    //                 },
    //                 baseURL: "http://52.78.217.50:8080",
    //             },
    //         )
    //             .then(response => {
    //                 console.log(response);
    //                 // setTlist(response.data);
    //             })
    //             .catch((response) => { window.alert(response.response.data) });
    //     }
    // }




    return (
        <Page>
            <FontAwesomeIcon icon="fa-tags" size="2x" style={{ position: "fixed", top: "20px", left: "120px", zIndex: "10", color: "black" }}
                onClick={() => { setOpen(true) }}
            />
            {open ? (
                <TagsDiv>
                    {/* <SearchForm onSubmit={e => onSearch(e)}>
                    <TagSearch
                        type="text"
                        value={search}
                        placeholder="태그를 검색하세요"
                        onChange={onChangeSearch}
                    />
                    <SearchBtn type="submit">검색</SearchBtn >

                    </SearchForm> */}
                    <TagBox>
                        {tag_lists.map((tags, idx) => {
                            return (
                                <TagBtn key={idx}
                                // onClick={ByTag(tag_lists[idx])}
                                >
                                    {tag_lists[idx]}
                                </TagBtn>
                            );
                        })}
                    </TagBox>
                    <div style={{ marginRight: "10px" }}>
                        <FontAwesomeIcon icon="fa-circle-xmark" style={{ marginTop: "13px" }}
                            onClick={() => { setOpen(false) }}
                        /><br /><br />
                        <FontAwesomeIcon icon="fa-arrow-rotate-left"
                        // onClick={() => { setTlist(post_list) }}
                        />
                    </div>
                </TagsDiv>
            ) : (null)}
            <ListStyle>
                {lists.map((list, index) => {
                    return (
                        <div key={index}>

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
                                    {/* <FontAwesomeIcon icon="fa-heart" color="red" size="2x" />
                                    <Cnt>{list.liked}</Cnt> */}
                                    <h5 style={{ fontStyle: " italic", color: "white" }}> {list.user_nick}님의 게시물 <br /> {list.time}</h5>
                                    <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
                                        <FontAwesomeIcon icon="fa-comment-dots" color="white" size="2x" />
                                        <Cnt>{list.comment_cnt}</Cnt>
                                    </div>
                                </CardInfo>
                                <TagDiv>
                                    {list.tag.map((t, i) => {
                                        return (
                                            <SmallTag key={i}>{list.tag[i]}</SmallTag>
                                        );
                                    })}
                                </TagDiv>
                            </CardStyle>
                        </div>
                    );
                })}
            </ListStyle>      {
                is_login ? (
                    <AddBtn
                        onClick={() => {
                            navigate("/posting");
                        }}
                    >
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
    max-width: 60vw;
    margin: 10px auto;
    gap: 10px;
`;



//
const TagsDiv = styled.div`
display: flex;
flex-direction: row;
background-color: #e3e3e3;
margin: 0px auto;
border: 1px solid white;
border-radius: 10px;
width: 80vw;
`;

// const SearchForm = styled.form`
// display: flex;
// flex-direction: row;
// margin: 10px auto;
// `;

// const SearchBtn = styled.button`
// margin-left: 10px;
// background-color: white;
// border-radius: 3px;
// border: 1px solid black;
// color: black;
// padding: 0.25em 0.55em;
// font-size: 16px;
// `;

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

// const TagSearch = styled.input`
// text-align: center;
// width: 30vw;
// height: 25px;
// margin-left: 30%;
// border: 1px solid black;
// `;

const TagBtn = styled.button`
background: white;
border-radius: 5px;
border: 1px solid black;
color: black;
padding: 0.25em 0.55em;
font-size: 15px;
font-weight: 600;
font-family: 'Gothic A1', sans-serif;
width: 100px;
`;

// const ExtraDiv = styled.div`
// display: flex;
// flex-direction: row;
// `;

// const EDBtn = styled.div`
// align-items: center;
// display: flex;
// flex-direction: row;
// gap: 15px;
// `;

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
`;

const CardInfo = styled.div`
display: flex;
flex-direction: row;
gap: 40px;
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



    //검색 기능
    // const [search, setSearch] = React.useState("");
    // const onSearch = (e) => {
    //     e.preventDefault();
    //     if (search === null || search === "") {
    //         // axios.get("url")
    //         // .then((response)=>{
    //         //     setLists(response.data.post)
    //         // })
    //         setLists(post_lists);
    //     } else {
    //         const filterData = lists.filter((lists) => lists.tag.includes(search))
    //         setLists(filterData);
    //     }
    //     setSearch("");
    // }
    // const onChangeSearch = (e) => {
    //     e.preventDefault();
    //     setSearch(e.target.value);
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