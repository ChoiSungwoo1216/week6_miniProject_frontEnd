import React from "react";
import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

// import { deletePostFB } from "../redux/modules/post";

const Post = () => {
    //Post리스트와 이전에서 넘겨받은 index useParams로 바음
    const single_lists = useSelector((state) => state.single.list);
    const params = useParams();
    const navigate = useNavigate();
    // const dispatch = useDispatch();

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
                    <RowTxt> {single_lists[index].img_url} </RowTxt>
                    <div>{single_lists[index].title}</div>

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
                <div style={{ width: "30vw", height: "50vh" }}>
                    {single_lists[index].comment_list.map((list, idx) => {
                        return (
                            <div style={{ border: "1px solid black", margin: "10px" }}>
                                <div>{list.comment}</div>
                                <div>{list.time}</div>
                            </div>
                        );
                    })
                    }
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

const CardStyleD = styled.div`
margin: 200px auto 20px auto;
width: 80vw;
background-color: #cfffaf;
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
justify-content: center;
gap: 20px;
margin: auto;
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