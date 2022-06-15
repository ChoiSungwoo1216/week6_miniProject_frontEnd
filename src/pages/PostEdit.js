/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";


// import { addsingle } from "../redux/modules/single";
// import { addpost } from "../redux/modules/post";

import talking from "../Img/talking.PNG"

const PostEdit = () => {
    // const dispatch = useDispatch();
    // const navigate = useNavigate();
    //작성이 되었는지 확인

    const single_lists = useSelector((state) => state.single.list);
    const tagLists = useSelector((state) => state.single.tag);

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

    const [title_check, setTitle] = React.useState("");
    const [tag_check, setTag] = React.useState("");


    const [up_txt, setUpTxt] = React.useState("")
    const [down_txt, setDownTxt] = React.useState("")

    const up_txt_ref = React.useRef(null);
    const down_txt_ref = React.useRef(null);
    const title_ref = React.useRef(null);
    const tag_ref = React.useRef(null);

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

        //Tag 추가
        const [newtag, setNewtag] = React.useState("");
        const [tags, setTags] = React.useState(single_lists[index].tag);
    
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
        //AXOIS
        // const EditPostAxios = async () => {
        //     axios.defaults.withCredentials = true;
        //     axios(
        //         {
        //             url: "/updateMyPage/user_id",
        //             method: "put",
        //             data: {
        //                 "title": title_check,
        //                 "tag": tags,
        //                 "up_layer_value": up_layer_value,
        //                 "down_layer_value": down_layer_value,
        //                 "up_txt": up_txt,
        //                 "down_txt": down_txt,
        //             },
        //             baseURL: "http://52.78.217.50:8080",
        //         },
        //         {
        //             headers: {
        //                 "Authorization": localStorage.getItem("Authorization"),
        //                 "RefreshToken": localStorage.getItem("RefreshToken")
        //             }
        //         }
        //     )
        //         .then(response => {
        //             console.log(response);
        //             window.alert(response.response.data);
        //             navigate("/post/" + postid);
        //         })
        //         .catch((response) => {
        //             window.alert(response.response.data)
        //         })
        // };

    return (
        <CardStyle>
            <CardInside>
                <ImgTxtDiv>
                    <ImageDiv>
                        {(up_layer_value === "") ? (null) : (
                            <Ballon>{single_lists[index].up_text_value}</Ballon>
                        )}
                        <ImgInputed src={single_lists[index].img_url} style={{ marign: "0px", padding: "0px" }} />
                        {(down_layer_value === "") ? (null) : (
                            <Ballon>{single_lists[index].down_text_value}</Ballon>
                        )}
                    </ImageDiv>
                </ImgTxtDiv>
                <LayerDiv>
                    <TitleDiv >
                        <h1 style={{ margin: "0px", color: "white" }}>제목 :</h1>
                        <input type="text"
                            ref={title_ref}
                            onChange={(e) => {
                                setTitle(e.target.value);
                            }} placeholder="제목을 입력해주세요"
                            style={{ marginLeft: "60px", width: "70%", textAlign: "center", fontWeight: "600", fontSize: "25px" }}
                        />
                    </TitleDiv>
                    <TagDiv>
                        <h2 style={{ border: "2px solid #2f2f2f", borderRadius: "10px", margin: "5px auto 10px auto", color: "orange", backgroundColor: "white", width: "100px" }}>TAG</h2>
                        <SelectTagDiv>
                            {tags.map((v, idx) => {
                                return (
                                    <SelectTag key={idx}
                                        onClick={(e, idx) => deleteTag(e, idx)}
                                    >{tags[idx]}</SelectTag>
                                )
                            })
                            }
                        </SelectTagDiv>
                        <TagForm onSubmit={(e) => onTag(e)}>
                            {/* 인풋으로 태그 추가하는 법 
                            <TagInput type="text" value={newtag} placeholder="태그를 입력하세요" onChange={onChangeTag} />
                            <TagAddBtn type="submit">태그 추가</TagAddBtn> */}
                            {/*Select로 추가하는 법*/}
                            <TagSelect type="text" value={newtag} onChange={onChangeTag}>
                                <option value="" disabled hidden> Select a Tag </option>
                                {tagLists.map((t, ix) => {
                                    return (
                                        <option key={ix} value={t}>{t}</option>
                                    );
                                })}
                            </TagSelect>
  
                            <TagAddBtn type="submit" >태그추가</TagAddBtn>
                        </TagForm>
                    </TagDiv>
                    <BallonDiv>
                        <Ballon>말풍선 고르기</Ballon>
                        <div>
                            <div>
                                <input type="checkbox" name="1" value="upText" onChange={up_is_checked} style={{ marginBottom: "10px" }} 
                                checked={up_layer_value !== "" ? true : false}
                                /><strong>상단 말풍선</strong><br />
                                <input type="text" ref={up_txt_ref} placeholder="짤태식이" onChange={(e) => { setUpTxt(e.target.value) }} style={{ height: "20px", textAlign: "center", marginBottom: "10px" }} />
                            </div>
                            <div>
                                <input type="checkbox" name="2" value="downText" onChange={down_is_checked} style={{ marginBottom: "10px" }} 
                                checked={down_layer_value !== "" ? true : false}
                                /><strong>하단 말풍선</strong><br />
                                <input type="text" ref={down_txt_ref} placeholder="돌아왔구나" onChange={(e) => { setDownTxt(e.target.value) }} style={{ height: "20px", textAlign: "center", marginBottom: "10px" }} />
                            </div>
                        </div>
                    </BallonDiv>
                    <EditPostBtn
                        disabled={
                            title_check === "" || tags ===[]
                                ? true : false
                        }
                        // onClick={EditPostAxios}
                    >수정 완료</EditPostBtn>
                </LayerDiv>
            </CardInside>
        </CardStyle>
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

const ImageDiv = styled.div`
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

const TagDiv = styled.div`
border: 10px solid #2f2f2f;
border-radius: 10px;
height: 260px;
padding: 10px;
background-color: white;
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

const TagForm = styled.form`
display: flex;
flex-direction: row;
justify-content: center;
gap: 20px;
margin: 20px auto;
padding: 10px;
border-radius: 10px;
`;

const TagSelect = styled.select`
height: 25px;
width:200px;
font-size: 17px;
text-align: center;
border-radius: 5px;
`;

const TagAddBtn = styled.button`
height: 30px;
width: 100px;
border: 2px solid #2f2f2f;
border-radius: 5px;
font-size: 15px;
font-weight: 400;
background-color: orange;
`;

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

const SelectTag = styled.div`
background-color: orange;
height: 40px;
line-height: 40px;
width: 120px;
margin: 5px;
border-radius: 10px;
font-weight: 600;
`;

const EditPostBtn = styled.button`
    margin: 10px auto;
    width: 30%;
    height: 50px;
    background-color: #353535;
    color: white;
    font-size: 30px;
    border-radius: 10px;
    font-family: 'Black Han Sans';
`;

export default PostEdit;