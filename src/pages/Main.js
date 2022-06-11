import React from "react";
import styled from "styled-components";
// import { useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";




const Main = () => {

    // const post_lists = useSelector((state) => state.post.list);
    const navigate = useNavigate();

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



    return (
        <Page>
            <ListStyle>
                <h1>HI</h1>
{/*                 
                {post_lists.map((list, index) => {
                    return (
                        <CardStyle key={index}>
                            <NameDateEDBtn>
                                <h5 style={{ fontStyle: " italic" }}> {list.nick}님의 게시물 <br /> {list.upload_time}</h5>
                                {user_check(index, user) ? (
                                <EDBtn>
                                    <button
                                    onClick={() => {
                                        navigate("/postedit/" + index);
                                    }}
                                    >수정하기</button>
                                    <button
                                    onClick={() => {
                                        dispatch(deletePostFB(post_lists[index].id));
                                        window.alert("삭제 완료");
                                        navigate("/");
                                    }}
                                    >삭제하기</button>
                                </EDBtn>
                                ) : (null)
                                }
                            </NameDateEDBtn>
                            {
                                `${list.layer}` === "rightText"
                                    ? (
                                        <RowImgTxt
                                            onClick={() => {
                                                navigate("/postdetail/" + index);
                                            }}
                                        >
                                            <RowImg src={list.image_url} alt="불러오기 실패" />
                                            <Explanation> {list.explanation} </Explanation>
                                        </RowImgTxt>)
                                    : (null)
                            }

                            {
                                `${list.layer}` === "leftText"
                                    ? (
                                        <RowImgTxt
                                            onClick={() => {
                                                navigate("/post/" + index);
                                            }}
                                        >
                                            <Explanation> {list.explanation} </Explanation>
                                            <RowImg src={list.image_url} alt="불러오기 실패" />
                                        </RowImgTxt>)
                                    : (null)
                            }
                            {
                                `${list.layer}` === "downText"
                                    ? (
                                        <ColumnImgTxt
                                            onClick={() => {
                                                navigate("/post/" + index);
                                            }}
                                        >
                                            <ColumnImg src={list.image_url} alt="불러오기 실패" />
                                            <Explanation> {list.explanation} </Explanation>
                                        </ColumnImgTxt>)
                                    : (null)
                            }
                        </CardStyle>
                    );
                })}
                 */}
            </ListStyle>      {is_login ? (
                <AddBtn onClick={() => {
                    navigate("/posting");
                }}
                >+</AddBtn>
            ) : (
                (null)
            )}

        </Page>
    )
}

const Page = styled.div`
width: 100vw;
margin: 100px auto auto auto;
`;

const ListStyle = styled.div`
  overflow-x: hidden;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

//

// const CardStyle = styled.div`
// align-items: center;
// justify-content: center;
// width: 50vw;
// background-color: #cfffaf;
// margin : 20px auto;
// padding: 0px 20px 20px 20px;
// border: 2px solid blueviolet;
// border-radius: 10px;
// transition: box-shadow 300ms ease-in-out;
// &:hover {
//   box-shadow: rgba(0, 0, 0, 0.5) 0px 5px 15px 0px;
// }
// `;

// const NameDateEDBtn = styled.div`
// display: flex;
// flex-direction: row;
// justify-content: center;
// gap: 10px;
// `;

// const EDBtn = styled.div`
// display: flex;
// flex-direction: row;
// align-items: center;
// gap: 10px;
// `;

// const RowImgTxt = styled.div`
// display: flex;
// flex-direction: row;
// justify-content: center;
// gap: 5%;
// margin: auto; 
// `;

// const ColumnImgTxt = styled.div`
// display: flex;
// flex-direction: column;
// align-items: center;
// gap: 5%;
// margin: auto;
// `

// const RowImg = styled.img`
// width: 20vw;
// height: 20vh;
// object-fit: cover; 
// `;

// const ColumnImg = styled.img`
// width: 20vw;
// height: 20vh;
// object-fit: cover; 
// margin-bottom: 5%;
// `;

// const Explanation = styled.div`
// width: 20vw;
// height: 20vh;
// background-color: white;
// line-height: 20vh;
// `

//

const AddBtn = styled.div`

position: fixed;
bottom: 5vh;
right: 5vw;
width: 50px;
height: 50px;
border-radius: 50px;
background-color: #673ab7;
padding: 25px, 25px;
color: white;
line-height: 55%;
text-align: center;
font-size: 65px;
font-weight: bold;

transition: transform 300ms ease-in-out;
&:hover {
  transform: rotate(90deg);
}
`;

export default Main;