/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import axios from "axios";

import talking from "../Img/talking.PNG"

const PostEdit = () => {
    const navigate = useNavigate();

    //작성이 되었는지 확인

    const post_lists = useSelector((state) => state.post.list);

    const ListTag = useSelector((state) => state.tag.tag);

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

    console.log(index);
    console.log(post_lists[index].tagList[0].tag)

    const tl = post_lists[index].tagList.map((e, idx) => {
        const tli = post_lists[index].tagList[idx].tag
        return tli;
    })
    console.log(tl);

    const [title_check, setTitle] = React.useState(post_lists[index].title);


    const [up_txt, setUpTxt] = React.useState(post_lists[index].up_txt)
    const [down_txt, setDownTxt] = React.useState(post_lists[index].down_txt)

    const up_txt_ref = React.useRef(null);
    const down_txt_ref = React.useRef(null);
    const title_ref = React.useRef(null);

    // layer 선택
    const [up_layer_value, setUpLayout] = React.useState(post_lists[index].up_layer_value);
    const up_is_checked = (e) => {
        if (e.target.checked) {
            setUpLayout(e.target.value);
        } else {
            setUpLayout("");
        }
    };

    const [down_layer_value, setDownLayout] = React.useState(post_lists[index].down_layer_value);
    const down_is_checked = (e) => {
        if (e.target.checked) {
            setDownLayout(e.target.value);
        } else {
            setDownLayout("");
        }
    };

    //Tag 추가
    const [newtag, setNewtag] = React.useState("");
    const [tags, setTags] = React.useState(tl);
    console.log(tags);
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
    const EditPostAxios = async (dispatch) => {
        axios.defaults.withCredentials = true;
        axios(
            {
                url: "/updateMyPage",
                method: "put",
                data: {
                    "id": post_id,
                    "title": title_check,
                    "tagList": tags,
                    "up_layer_value": up_layer_value,
                    "down_layer_value": down_layer_value,
                    "up_txt": up_txt,
                    "down_txt": down_txt,
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
                window.alert(response.data);
                navigate("/");
            })
            .catch((response) => {
                if (response.response.data.reLogin === true) {
                    window.alert("다시 로그인 해주세요")
                } else {
                    window.alert(response.message)
                }
            })
    };

    return (
        <CardStyle>
            <CardInside>
                <ImgTxtDiv>
                    <ImageDiv>
                        {(up_layer_value === "") ? (null) : (
                            <Ballon>{up_txt}</Ballon>
                        )}
                        <ImgInputed src={post_lists[index].imgUrl} style={{ marign: "0px", padding: "0px" }} />
                        {(down_layer_value === "") ? (null) : (
                            <Ballon>{down_txt}</Ballon>
                        )}
                    </ImageDiv>
                </ImgTxtDiv>
                <LayerDiv>
                    <TitleDiv >
                        <h1 style={{ margin: "0px", color: "white" }} >제목 :</h1>
                        <input type="text"
                            ref={title_ref}
                            defaultValue={post_lists[index].title}
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
                            <TagSelect type="text" value={newtag} onChange={onChangeTag}>
                                <option value="" disabled hidden> Select a Tag </option>
                                {ListTag.map((t, ix) => {
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
                                <input type="text" ref={up_txt_ref} placeholder="짤태식이" onChange={(e) => { setUpTxt(e.target.value) }} style={{ height: "20px", textAlign: "center", marginBottom: "10px" }}
                                    defaultValue={post_lists[index].up_txt}
                                />
                            </div>
                            <div>
                                <input type="checkbox" name="2" value="downText" onChange={down_is_checked} style={{ marginBottom: "10px" }}
                                    checked={down_layer_value !== "" ? true : false}
                                /><strong>하단 말풍선</strong><br />
                                <input type="text" ref={down_txt_ref} placeholder="돌아왔구나" onChange={(e) => { setDownTxt(e.target.value) }} style={{ height: "20px", textAlign: "center", marginBottom: "10px" }}
                                    defaultValue={post_lists[index].down_txt}
                                />
                            </div>
                        </div>
                    </BallonDiv>
                    <EditPostBtn
                        onClick={EditPostAxios}
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