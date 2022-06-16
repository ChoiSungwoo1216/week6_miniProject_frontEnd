import { createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import post from "./modules/post";
import single from "./modules/single";
import tag from "./modules/tag"



const middlewares = [thunk];

const rootReducer = combineReducers({ post, single, tag });
const enhancer = applyMiddleware(...middlewares);
const store = createStore(rootReducer, enhancer);

export default store;