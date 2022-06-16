// post.js
//AXIOS
import axios from "axios";
// Actions


const LOAD = "post/LOAD";
const ADD = "post/ADD";
const EDIT = "post/EDIT";
const DELETE = "post/DELETE";

const initialState = {
  list: [
    //   {
    //                   id: 100,
    //                   title: "제목",
    //                   imgUrl: "img_check",
    //                   tagList: [{id:0, tag:"머머리"}, {id:1, tag:"럭키짱"}],
    //                   up_layer_value: "upText",
    //                   down_layer_value: "downText",
    //                   up_txt: "up_txt",
    //                   down_txt: "down_txt",
    //                   commentCnt: "0",
    //                   nickname: "현재 유저"
    // }
  ],
};

// Action Creators
export function loadpost(post_list) {
  return { type: LOAD, post_list };
}

export function addpost(post) {
  return { type: ADD, post: post };
}

export function editpost(post, post_index) {
  return { type: EDIT, post, post_index };
}

export function deletepost(post_index) {
  return { type: DELETE, post_index };
}

// // middlewares

export const LoadPostAxios = () => {
  axios.defaults.withCredentials = true;
  return async function (dispatch) {
    await axios(
      {
        url: "/post/all",
        method: "get",
        baseURL: "http://52.78.217.50:8080",
      }
    )
      .then(response => {
        const axios_data = response.data;
        let post_list = [...axios_data];
        dispatch(loadpost(post_list));
      })
      .catch((response) => {
        window.alert(response.message)
      });
  }
}

// export const loadPostFB = () => {
//   return async function (dispatch) {
//     const post_data = await getDocs(query(collection(db, "post"), orderBy("timestamp", "desc")));
//     let post_list = [];

//     post_data.forEach((b) => {
//       post_list.push({ id: b.id, ...b.data() });
//     });

//     dispatch(loadpost(post_list));
//   }
// }

// export const addPostFB = (post) => {
//   return async function (dispatch) {
//     const docRef = await addDoc(collection(db, "post"), post);
//     const post_data = { id: docRef.id, ...post };

//     dispatch(addpost(post_data));
//   }
// }

// export const editPostFB = (post, post_id) => {
//   return async function (dispatch, getState) {
//     const docRef = doc(db, "post", post_id);

//     await updateDoc(docRef, { ...post, ...post });

//     const _post_list = getState().post.list;
//     const post_index = _post_list.findIndex((b) => {
//       return b.id === post_id;
//     })

//     dispatch(editpost(post, post_index));
//   };
// };

// export const deletePostFB = (post_id) => {
//   return async function (dispatch, getState) {
//     if (!post_id) {
//       return;
//     }
//     const docRef = doc(db, "post", post_id);
//     await deleteDoc(docRef);

//     const _post_list = getState().post.list;
//     const post_index = _post_list.findIndex((b) => {
//       return b.id === post_id;
//     });

//     dispatch(deletepost(post_index));
//   }
// }

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "post/LOAD": {
      return { list: action.post_list };
    }

    case "post/ADD": {
      const new_post_list = [action.post, ...state.list];
      return { list: new_post_list };
    }

    case "post/EDIT": {
      const edit_post_list = state.list.map((post, idx) => {
        return Number(action.post_index) === idx
          ? { ...post, ...action.post }
          : post;
      });
      return { ...state, list: edit_post_list };
    }

    case "post/DELETE": {
      const new_post_list = state.list.filter((l, idx) => {
        return parseInt(action.post_index) !== idx;
      });

      return { list: new_post_list };
    }

    default:
      return state;
  }
}