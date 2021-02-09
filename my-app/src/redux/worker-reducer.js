import React from "react";

const SET_USERS = 'SET_USERS';
const ADD_USER = 'ADD_USER';

let initialState = {
    workers: [
        {id: 1, surname: 'Iugai',name: 'Maxim',middlename: 'Leo', age: 26, position: 'Front-End', salary:'130000 руб.'},
        {id: 2, surname: 'Samson',name: 'Chris',middlename: 'O', age: 20, position: 'Back-End', salary:'13000 руб.'},
        {id: 3, surname: 'Lor',name: 'Vit',middlename: 'Kop', age: 22, position: 'Верстальщик', salary:'50000 руб.'}
    ]
}

const workerReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_USER: {
            return {
                ...state,
                workers: [...state.workers, action.newUser]
            }
        }

        default: return state;
    }
};

export default workerReducer;

export const setUsers = (profile) => {
    return {
        type: SET_USERS,
        profile
    }
}

export const addUser = (newUser) => {
    return {
        type: SET_USERS,
        newUser
    }
}