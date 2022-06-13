// // info.js
// import { db } from "../../shared/firebase";
// import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, query, orderBy} from "firebase/firestore";

// Actions
const LOAD = "single/LOAD";
const ADD = "single/ADD";
const EDIT = "single/EDIT";
const DELETE = "single/DELETE";

const initialState = {
    list: [
        {
            postid: "number1", img_url: "이미지1", tag: ["tag1", "tag2"], user_nick: "김성모", liked: "0", comment_cnt: "2", time: "2022-06-11 00:00", title: "제목 12",
            comment_list: [{ comment: "댓글 1", time: "2022-06-12 18:33" }, { comment: "댓글 2", time: "2022-06-12 18:33" }], 
            up_text_layer: "1",
            up_text_value: "비로그인이",
            down_text_layer: "2",
            down_text_value: "로그인?!"
        },
        {
            postid: "number2", img_url: "이미지2", tag: ["tag2", "tag3"], user_nick: "김성모", liked: "1", comment_cnt: "3", time: "2022-06-11 00:01", title: "제목 23",
            comment_list: [{ comment: "댓글 1", time: "2022-06-12 18:33" }, { comment: "댓글 2", time: "2022-06-12 18:33" }, { comment: "댓글 3", time: "2022-06-12 18:33" }],
            up_text_layer: "",
            up_text_value: "",
            down_text_layer: "2",
            down_text_value: "로그인?!"
        },
        {
            postid: "number3", img_url: "이미지3", tag: ["tag3", "tag4"], user_nick: "김성모", liked: "2", comment_cnt: "3", time: "2022-06-11 00:02", title: "제목 34",
            comment_list: [{ comment: "댓글 1", time: "2022-06-12 18:33" }, { comment: "댓글 2", time: "2022-06-12 18:33" }, { comment: "댓글 3", time: "2022-06-12 18:33" }],
            up_text_layer: "1",
            up_text_value: "비로그인이",
            down_text_layer: "",
            down_text_value: ""
        },
        {
            postid: "number4", img_url: "이미지4", tag: ["tag4", "tag5"], user_nick: "김성모", liked: "3", comment_cnt: "3", time: "2022-06-11 00:03", title: "제목 45",
            comment_list: [{ comment: "댓글 1", time: "2022-06-12 18:33" }, { comment: "댓글 2", time: "2022-06-12 18:33" }, { comment: "댓글 3", time: "2022-06-12 18:33" }],
            up_text_layer: "",
            up_text_value: "",
            down_text_layer: "",
            down_text_value: ""
        },
        {
            postid: "number5", img_url: "이미지5", tag: ["tag5", "tag0"], user_nick: "김성모", liked: "4", comment_cnt: "3", time: "2022-06-11 00:04", title: "제목 50",
            comment_list: [{ comment: "댓글 1", time: "2022-06-12 18:33" }, { comment: "댓글 2", time: "2022-06-12 18:33" }, { comment: "댓글 3", time: "2022-06-12 18:33" }],
            up_text_layer: "1",
            up_text_value: "비로그인이",
            down_text_layer: "2",
            down_text_value: "로그인?!"
        },
    ],
};

// Action Creators
export function loadsingle(single_list) {
    return { type: LOAD, single_list };
}

export function addsingle(single) {
    return { type: ADD, single: single };
}

export function editsingle(single, single_index) {
    return { type: EDIT, single, single_index };
}

export function deletesingle(single_index) {
    return { type: DELETE, single_index };
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
        case "single/LOAD": {
            return { list: action.single_list };
        }

        case "single/ADD": {
            const new_single_list = [action.single, ...state.list];
            return { list: new_single_list };
        }

        case "post/EDIT": {
            const edit_single_list = state.list.map((single, idx) => {
                return Number(action.single_index) === idx
                    ? { ...single, ...action.single }
                    : single;
            });
            return { ...state, list: edit_single_list };
        }

        case "post/DELETE": {
            const new_single_list = state.list.filter((l, idx) => {
                return parseInt(action.single_index) !== idx;
            });

            return { list: new_single_list };
        }

        default:
            return state;
    }
}