// // info.js
// import { db } from "../../shared/firebase";
// import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, query, orderBy} from "firebase/firestore";

// Actions
const LOAD = "tag/LOAD";
const ADD = "tag/ADD";
const EDIT = "tag/EDIT";
const DELETE = "tag/DELETE";

const initialState = {
  tag: ["머머리", "럭키짱", "영화", "축구", "이런태그", "달고있는", "나는정말", "이게먼지", "모르겠다", "이게맞나"],
};

// Action Creators
export function loadtag(tag_list) {
    return { type: LOAD, tag_list };
}

export function addtag(tag) {
    return { type: ADD, tag: tag };
}

export function edittag(tag, tag_index) {
    return { type: EDIT, tag, tag_index };
}

export function deletetag(tag_index) {
    return { type: DELETE, tag_index };
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
        case "tag/LOAD": {
            return { list: action.tag_list };
        }

        case "tag/ADD": {
            const new_tag_list = [action.tag, ...state.list];
            return { list: new_tag_list };
        }

        case "post/EDIT": {
            const edit_tag_list = state.list.map((tag, idx) => {
                return Number(action.tag_index) === idx
                    ? { ...tag, ...action.tag }
                    : tag;
            });
            return { ...state, list: edit_tag_list };
        }

        case "post/DELETE": {
            const new_tag_list = state.list.filter((l, idx) => {
                return parseInt(action.tag_index) !== idx;
            });

            return { list: new_tag_list };
        }

        default:
            return state;
    }
}