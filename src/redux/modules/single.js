// // info.js
// import { db } from "../../shared/firebase";
// import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, query, orderBy} from "firebase/firestore";

// Actions
const LOAD = "single/LOAD";
const ADD = "single/ADD";
const EDIT = "single/EDIT";
const DELETE = "single/DELETE";

const initialState = {
    list:[],
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

        // case "post/EDIT": {
        //     const edit_single_list = state.list.map((single, idx) => {
        //         return Number(action.single_index) === idx
        //             ? { ...single, ...action.single }
        //             : single;
        //     });
        //     return { ...state, list: edit_single_list };
        // }

        case "single/DELETE": {
            const new_single_list = state.list.filter((l, idx) => {
                return parseInt(action.single_index) !== idx;
            });

            return { list: new_single_list };
        }

        default:
            return state;
    }
}