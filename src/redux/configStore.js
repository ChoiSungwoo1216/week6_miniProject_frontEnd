import { createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import post from "./modules/post";
import single from "./modules/single";



const middlewares = [thunk];

const rootReducer = combineReducers({ post, single });
const enhancer = applyMiddleware(...middlewares);
const store = createStore(rootReducer, enhancer);

export default store;