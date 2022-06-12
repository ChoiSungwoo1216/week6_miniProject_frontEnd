// // info.js
// import { db } from "../../shared/firebase";
// import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, query, orderBy} from "firebase/firestore";

// Actions
const LOAD = "post/LOAD";
const ADD = "post/ADD";
const EDIT = "post/EDIT";
const DELETE = "post/DELETE";

const initialState = {
  list: [
    {postid: "number1", img_url: "이미지1", tag: ["tag1", "tag2"], user_nick: "김성모", liked: "0", comment_cnt:"3", time: "2022-06-11 00:00", title: "제목 12"},
    {postid: "number2", img_url: "이미지2", tag: ["tag2", "tag3"], user_nick: "김성모", liked: "1", comment_cnt:"4", time: "2022-06-11 00:01", title: "제목 23"},
    {postid: "number3", img_url: "이미지3", tag: ["tag3", "tag4"], user_nick: "김성모", liked: "2", comment_cnt:"5", time: "2022-06-11 00:02", title: "제목 34"},
    {postid: "number4", img_url: "이미지4", tag: ["tag4", "tag5"], user_nick: "김성모", liked: "3", comment_cnt:"6", time: "2022-06-11 00:03", title: "제목 45"},
    {postid: "number5", img_url: "이미지5", tag: ["tag5", "tag0"], user_nick: "김성모", liked: "4", comment_cnt:"7", time: "2022-06-11 00:04", title: "제목 50"},
  ],
  tag: ["tag0","tag1", "tag2", "tag3", "tag4","tag5"],
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