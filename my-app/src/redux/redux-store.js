import {combineReducers, createStore} from "redux";
import workerReducer from "./worker-reducer";
import profileReducer from "./profile-reducer";
import {reducer as formReducer} from "redux-form";

const reducers = combineReducers({
    workerPage: workerReducer,
    profilePage: profileReducer,
    form: formReducer
});

let store = createStore(reducers);

export default store;