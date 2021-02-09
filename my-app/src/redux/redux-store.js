import {combineReducers, createStore} from "redux";
import workerReducer from "./worker-reducer";
import profileReducer from "./profile-reducer";

const reducers = combineReducers({
    workerPage: workerReducer,
    profilePage: profileReducer
});

let store = createStore(reducers);

export default store;