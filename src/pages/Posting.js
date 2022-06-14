/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import styled from "styled-components";
// import { useNavigate } from "react-router-dom";

import { storage } from "../shared/firebase";
// import { getAuth } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// import { addPostFB } from "../redux/modules/post";

// import { useDispatch, useSelector } from "react-redux";

// import { addsingle } from "../redux/modules/single";
// import { addpost } from "../redux/modules/post";
import talking from "../Img/talking.PNG"


const Posting = () => {
    // const dispatch = useDispatch();
    // const navigate = useNavigate();
    //작성이 되었는지 확인
    const [img_check, setImg] = React.useState(null);
    const [title_check, setTitle] = React.useState("");

    const [up_txt, setUpTxt] = React.useState("")
    const [down_txt, setDownTxt] = React.useState("")

    const up_txt_ref = React.useRef(null);
    const down_txt_ref = React.useRef(null);
    const title_ref = React.useRef(null);
    const file_link_ref = React.useRef(null);


    //유저 정보 가져오기
    // const auth = getAuth();
    // const user = auth.currentUser;

    // const user_list = useSelector((state) => state.users.list);
    // const user_index = user_list.findIndex((b) => {
    //     return b.user_id === user.email;
    // });

    // layer 선택
    const [up_layer_value, setUpLayout] = React.useState("");
    const up_is_checked = (e) => {
        if (e.target.checked) {
            setUpLayout(e.target.value);
        } else {
            setUpLayout("");
        }
    };

    const [down_layer_value, setDownLayout] = React.useState("");
    const down_is_checked = (e) => {
        if (e.target.checked) {
            setDownLayout(e.target.value);
        } else {
            setDownLayout("");
        }
    };

    //작성 날짜
    // const t_stamp = new Date();
    // let up_time = t_stamp.toDateString() + ", " + t_stamp.getHours() + ":" + t_stamp.getMinutes();

    //이미지 업로드
    const uploadFB = async (e) => {

        const uploaded_file = await uploadBytes(
            ref(storage, `images/${e.target.files[0].name}`),
            e.target.files[0]
        );


        const file_url = await getDownloadURL(uploaded_file.ref);

        file_link_ref.current = { url: file_url };
        setImg(file_link_ref.current.url);
    };

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
    const [newtag, setNewtag] = React.useState("");
    const [tags, setTags] = React.useState([]);

    console.log("태그", tags)
    console.log("태그타입", typeof tags)
    // const taglist = [];
    // console.log(taglist);

    const onTag = (e) => {
        e.preventDefault();
        if (newtag !== null && newtag !== "") {
            const taglist = [...tags, newtag];
            setTags(taglist);
        }
        setNewtag("")
    }

    const onChangeTag = (e) => {
        e.preventDefault();
        setNewtag(e.target.value);

    }

    const deleteTag = (e, idx) => {
        e.preventDefault();
        const deltag = tags.splice(idx, 1);
        setNewtag(deltag);
    }

    return (
        <CardStyle>
            <CardInside>
                <ImgTxtDiv>
                    <ImgDiv>
                        <h3 style={{ margin: "0px", color: "white" }}>이미지 첨부</h3>
                        <InputImg type="file"
                            onChange={uploadFB}
                        />
                    </ImgDiv>
                    <PictureDiv>
                        {(up_layer_value === "") ? (null) : (
                            <Ballon>{up_txt}</Ballon>
                        )}
                        <ImgInputed src={img_check} style={{ marign: "0px", padding: "0px" }} />
                        {(down_layer_value === "") ? (null) : (
                            <Ballon>{down_txt}</Ballon>
                        )}
                    </PictureDiv>
                </ImgTxtDiv>
                <LayerDiv>
                    <TitleDiv>
                        <h1 style={{ margin: "0px", color: "white" }}>제목 :</h1>
                        <input type="text"
                            ref={title_ref}
                            onChange={(e) => {
                                setTitle(e.target.value);
                            }}
                            placeholder="제목을 입력해주세요"
                            style={{ marginLeft: "10px", width: "70%", textAlign: "center" }}
                        />
                    </TitleDiv>
                    <TagDiv>
                        <h2 style={{ border: "2px solid #2f2f2f", borderRadius: "10px", margin: "5px auto 10px auto", color: "orange", backgroundColor: "white", width: "100px" }}>TAG</h2>
                        <SelectTagDiv>
                            {tags.map((v, idx) => {
                                return (
                                    <SelectTag
                                        onClick={(e, idx) => deleteTag(e, idx)}
                                    >{tags[idx]}</SelectTag>

                                )
                            })
                            }
                        </SelectTagDiv>
                        <TagForm onSubmit={(e) => onTag(e)}>
                            <TagInput type="text" value={newtag} placeholder="태그를 입력하세요" onChange={onChangeTag} />
                            <TagAddBtn type="submit">태그 추가</TagAddBtn>
                        </TagForm>

                    </TagDiv>
                    <BallonDiv>
                        <h3>말풍선 고르기</h3>
                        <div>
                            <div>
                                <input type="checkbox" name="1" value="upText" onChange={up_is_checked} style={{ marginBottom: "10px" }} /><strong>상단 말풍선</strong><br />
                                <input type="text" ref={up_txt_ref} placeholder="짤태식이" onChange={(e) => { setUpTxt(e.target.value) }} style={{height:"20px", textAlign:"center", marginBottom:"10px"}}/>
                            </div>
                            <div>
                                <input type="checkbox" name="2" value="downText" onChange={down_is_checked} style={{ marginBottom: "10px" }} /><strong>하단 말풍선</strong><br />
                                <input type="text" ref={down_txt_ref} placeholder="돌아왔구나" onChange={(e) => { setDownTxt(e.target.value) }} style={{height:"20px", textAlign:"center", marginBottom:"10px"}}/>
                            </div>
                        </div>
                    </BallonDiv>
                    <AddPostBtn
                        // onClick={addPostList}
                        disabled={
                            img_check === null || title_check === ""
                                ? true : false
                        }
                    >올 리 기</AddPostBtn>
                </LayerDiv>
            </CardInside>
        </CardStyle>
    );
};

const BallonDiv = styled.div`
border: 1px solid black;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
gap: 50px;
border: 10px solid #2f2f2f;
border-radius: 10px;
background-color: white;
padding: 20px;
`;

const TagInput = styled.input`
height: 25px;
font-size: 17px;
text-align: center;
border-radius: 5px;
`;

const TagAddBtn = styled.button`
height: 30px;
border-radius: 5px;
`;

const TagForm = styled.form`
display: flex;
flex-direction: row;
justify-content: center;
gap: 20px;
margin: 20px auto;
padding: 10px;
border-radius: 10px;
`;

const TagDiv = styled.div`
border: 10px solid #2f2f2f;
border-radius: 10px;
height: 260px;
padding: 10px;
background-color: white;
`;

const TitleDiv = styled.div`
display: flex;
flex-direction: row;
border: 1px solid black;
padding: 20px;
height: 50px;
background-color: #2f2f2f;
border-radius: 10px;
margin-top: 10px;
`;

const SelectTagDiv = styled.div`
display: flex;
flex-wrap: wrap;
border: 2px solid #2f2f2f;
border-radius: 10px;
gap: 5px;
padding: 7px 5px;
height: 120px;
overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const SelectTag = styled.div`
background-color: orange;
height: 40px;
line-height: 40px;
width: 120px;
margin: 5px;
border-radius: 10px;

transition: box-shadow 300ms ease-in-out;
&:hover {
  box-shadow: rgba(0, 0, 0, 0.5) 0px 5px 15px 0px;
}
`;



const Ballon = styled.div`
background-image: url(${talking});
width: 345px;
height: 150px;
line-height: 150px;
font-size: 35px;
font-weight: 600;
`;

const CardStyle = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin: 90px auto auto auto;
padding: 10px 10px;
border: 10px solid gray;
border-radius: 10px;
width: 80vw;
background: darkgray;
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
align-items: center;
width: 50%;
margin: 0px auto;
`;

const ImgDiv = styled.div`
border: 1px solid black;
padding: 20px;
height: 50px;
background-color: #2f2f2f;
border-radius: 10px;
margin-top: 10px;
width: 350px;
`;

const InputImg = styled.input`
background-color: white;
width: 300px;
height: 24px;
margin: 10px auto;
`;

const PictureDiv = styled.div`
/* height: 70%; */
display: flex;
flex-direction: column;
margin: 10px auto;
border:3px solid white;
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
gap: 20px;
margin: 0;
max-height: 100%;
`;

const AddPostBtn = styled.button`
    margin: 10px auto;
    width: 30%;
    height: 50px;
    background-color: #353535;
    color: white;
    font-size: 30px;
    border-radius: 10px;
    font-family: 'Black Han Sans';
`;

export default Posting;