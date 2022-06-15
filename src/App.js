import './App.css';
import React from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

//pages
import Header from "./pages/Header"
import Main from "./pages/Main"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import Posting from "./pages/Posting"
import Post from "./pages/Post"
import PostEdit from "./pages/PostEdit"

//AXIOS
import { LoadPostAxios } from './redux/modules/post';

//font-awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPen, faHeart, faHouse, faPenToSquare, faTrashCan, faCommentDots, faArrowRotateLeft, faCircleXmark, faTags, faCommentMedical, faCircleCheck } from '@fortawesome/free-solid-svg-icons'
library.add(faHouse, faHeart, faPen, faPenToSquare, faTrashCan, faCommentDots, faArrowRotateLeft, faTags, faCircleXmark, faCommentMedical, faCircleCheck);

//불러오기




// index는 추후 post_id로 교체해서 사용할 예정
function App() {

  const dispatch = useDispatch();

  React.useEffect( () => {
    dispatch(LoadPostAxios());
  });

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/posting" element={<Posting />}></Route>
        <Route path="/post/:postid" element={<Post />}></Route>
        <Route path="/postedit/:postid" element={<PostEdit />}></Route>
      </Routes>
    </div>
  );
}

export default App;
