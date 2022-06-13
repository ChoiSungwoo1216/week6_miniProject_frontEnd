/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

import { storage } from "../shared/firebase";
// import { getAuth } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// import { addPostFB } from "../redux/modules/post";

import { useDispatch, useSelector } from "react-redux";

// import { addsingle } from "../redux/modules/single";
// import { addpost } from "../redux/modules/post";

import talking from "../Img/talking.PNG"

const PostEdit = () => {
    // const dispatch = useDispatch();
    // const navigate = useNavigate();
    //작성이 되었는지 확인

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

    const [img_check, setImg] = React.useState(null);
    const [title_check, setTitle] = React.useState("");
    const [tag_check, setTag] = React.useState("");


    const [up_txt, setUpTxt] = React.useState("")
    const [down_txt, setDownTxt] = React.useState("")

    const up_txt_ref = React.useRef(null);
    const down_txt_ref = React.useRef(null);
    const title_ref = React.useRef(null);
    const file_link_ref = React.useRef(null);
    const tag_ref = React.useRef(null);

    let tags = [];
    console.log(tags);
    //유저 정보 가져오기
    // const auth = getAuth();
    // const user = auth.currentUser;

    // const user_list = useSelector((state) => state.users.list);
    // const user_index = user_list.findIndex((b) => {
    //     return b.user_id === user.email;
    // });

    // layer 선택
    const [up_layer_value, setUpLayout] = React.useState(single_lists[index].up_text_value);
    const up_is_checked = (e) => {
        if (e.target.checked) {
            setUpLayout(e.target.value);
        } else {
            setUpLayout("");
        }
    };

    const [down_layer_value, setDownLayout] = React.useState(single_lists[index].down_text_value);
    const down_is_checked = (e) => {
        if (e.target.checked) {
            setDownLayout(e.target.value);
        } else {
            setDownLayout("");
        }
    };

    //작성 날짜
    const t_stamp = new Date();
    let up_time = t_stamp.toDateString() + ", " + t_stamp.getHours() + ":" + t_stamp.getMinutes();

    //이미지 업로드
    // const uploadFB = async (e) => {

    //     const uploaded_file = await uploadBytes(
    //         ref(storage, `images/${e.target.files[0].name}`),
    //         e.target.files[0]
    //     );


    //     const file_url = await getDownloadURL(uploaded_file.ref);

    //     file_link_ref.current = { url: file_url };
    //     setImg(file_link_ref.current.url);
    // };

    //Post 추가
    // const addPostList = () => {
    //     dispatch(addpost(
    //         {
    //             post_id: "number6",
    //             user_nick: "강건마",
    //             image_url: file_link_ref.current?.value,
    //             title: explanation_ref.current?.value,
    //             tag: [tag_ref.current.value],
    //             layer: layer_value,
    //             timestamp: t_stamp,
    //             upload_time: up_time,
    //         }
    //     ),
    //     addsingle(
    //         {
    //             post_id: "number6",
    //             user_nick: "강건마",
    //             image_url: file_link_ref.current?.value,
    //             title: explanation_ref.current?.value,
    //             tag: [tag_ref.current.value],
    //             layer: layer_value,
    //             timestamp: t_stamp,
    //             upload_time: up_time,

    //         }
    //     )
    //     );
    //     window.alert("작성완료");

    //     navigate("/");
    // };

    // function cancleTag(value, tags){
    //     for(let i = 0; i < tags.length; i++){
    //         if(tags[i] === value){
    //             tags.splice(i,1);
    //             i--;
    //         }
    //     }
    // }

    // const addTag= (value)=>{
    //     tags.push(value);
    //     console.log(tags);
    // }

    return (
        <PostingPage>
            <Subtitle>게시글 수정</Subtitle>
            <CardStyle>
                <CardInside>
                    <ImgTxtDiv>
                        <TxtDiv>
                            {(up_layer_value === "") ? (null) : (
                                <Ballon>{single_lists[index].up_text_value}</Ballon>
                            )}
                            <ImgInputed src={single_lists[index].img_url} style={{ marign: "0px", padding: "0px" }} />
                            {(down_layer_value === "") ? (null) : (
                                <Ballon>{single_lists[index].down_text_value}</Ballon>
                            )}
                        </TxtDiv>
                    </ImgTxtDiv>
                    <LayerDiv>
                        <div>
                            <h3>제목</h3>
                            <input type="text"
                                ref={title_ref}
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                }} />
                        </div>
                        <div>
                            <h3>TAG</h3>
                            <input type="text" ref={tag_ref} onChange={(e) => { setTag(e.target.value) }} />

                        </div>
                        <h3>레이아웃 고르기</h3>
                        <div>
                            <input type="checkbox" name="1" value="upText" onChange={up_is_checked} style={{ marginBottom: "10px" }} />1번 텍스트<br />

                            <input type="text" ref={up_txt_ref} defaultValue={single_lists[index].up_text_value} onChange={(e) => { setUpTxt(e.target.value) }} />

                        </div>
                        <div>
                            <input type="checkbox" name="2" value="downText" onChange={down_is_checked} style={{ marginBottom: "10px" }} />2번 텍스트  <br />
                            <input type="text" ref={down_txt_ref} defaultValue={single_lists[index].down_text_value} onChange={(e) => { setDownTxt(e.target.value) }} />
                        </div>
                    </LayerDiv>
                </CardInside>
            </CardStyle>
            <AddWordBtn
                disabled={
                    img_check === null || title_check === ""
                        ? true : false
                }
            >작성 완료</AddWordBtn>
        </PostingPage>
    );
};

const Ballon = styled.div`
background-image: url(${talking});
width: 345px;
height: 150px;
line-height: 150px;
font-size: 35px;
font-weight: 600;
`;

const PostingPage = styled.div`
margin-top: 90px;
`;

const Subtitle = styled.h1`
    width: 325px;
    height: 50px;
    font-weight: 600;
    text-align: center;
    margin: 0px auto;
    color: darkblue;
`;

const CardStyle = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin: 10px auto auto auto;
padding: 10px 10px;
border: 20px solid lightskyblue;
border-radius: 10px;
width: 80vw;
height: 80vh;
background-color: #cfffaf;
`;

const CardInside = styled.div`
display: flex;
flex-direction: row;
width: 100%;
gap: 10px;
margin: 0px;
padding: 0px;
`;

const ImgTxtDiv = styled.div`
display: flex;
flex-direction: column;
width: 50%;
margin: 0px auto;
`;

const ImgDiv = styled.div`
height: 30%;
margin: 10px auto;
padding: 0;
`;

const InputImg = styled.input`
background-color: white;
width: 300px;
height: 24px;
margin: 10px auto;
`;

const TxtDiv = styled.div`
/* height: 70%; */
display: flex;
flex-direction: column;
margin: 10px auto;
`;

const ImgInputed = styled.img`
width: 339px;
height: 345px;
border: 3px solid white;
background-color: white;
`;

const LayerDiv = styled.div`
display: flex;
flex-direction: column;
width: 50%;
margin: 0;
max-height: 100%;
`;

const RowLayer = styled.div`
display: flex;
flex-direction: row;
height: 100px;
justify-content: center;
`;

const RowTxt = styled.div`
width: 15vh;
height: 8vh;
line-height: 8vh;
background-color: white;
`;

const RowImg = styled.img`
width: 15vh;
height: 8vh;
object-fit: cover;
`;

const ColLayer = styled.div`
height: 100px;
margin: auto;
`;

const ColImg = styled.img`
width: 20vh;
height: 4vh;
object-fit: cover;
`;

const ColTxt = styled.div`
width: 20vh;
height: 4vh;
line-height: 4vh;
margin: auto;
background-color: white;
`;

const AddWordBtn = styled.button`
    margin: 10px auto;
    width: 82vw;
    height: 50px;
    background-color: #673ab7;
    color: white;
    font-size: 20px;
    font-weight: bold;
`;

export default PostEdit;