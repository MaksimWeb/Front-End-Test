import React from "react";

const ADD_USER = 'ADD_USER';
const ADD_CHANGE = 'ADD_CHANGE';
const PROFILE_IS_CHANGING = 'PROFILE_IS_CHANGING';
const ACCEPT_PROFILE_CHANGE = 'ACCEPT_PROFILE_CHANGE';
const DELETE = 'DELETE';
const TOGGLE_IS_DELETING = 'TOGGLE_IS_DELETING';
const TOGGLE_IS_CHANGING = 'TOGGLE_IS_CHANGING';

let initialState = {
    workers: [
        {
            id: 1,
            surname: 'Iugai',
            name: 'Maxim',
            middlename: 'Leo',
            age: 26,
            position: 'Front-End',
            salary: '130000',
            avatar: 'https://lh3.googleusercontent.com/proxy/nAZhBut55Nd7MheXeleHFa0q3bkh12chtDD76U9Y-yC0_A5nfOThnBJHPiATpjdsj478Ss9mvx-KDbb6fcXJxWZ7THu8e07hbWzLcOc'
        },
        {
            id: 2,
            surname: 'Samson',
            name: 'Chris',
            middlename: 'O',
            age: 20,
            position: 'Back-End',
            salary: '13000',
            avatar: 'https://lh3.googleusercontent.com/proxy/nAZhBut55Nd7MheXeleHFa0q3bkh12chtDD76U9Y-yC0_A5nfOThnBJHPiATpjdsj478Ss9mvx-KDbb6fcXJxWZ7THu8e07hbWzLcOc'
        },
        {
            id: 3,
            surname: 'Lor',
            name: 'Vit',
            middlename: 'Kop',
            age: 22,
            position: 'Верстальщик',
            salary: '50000',
            avatar: 'https://lh3.googleusercontent.com/proxy/nAZhBut55Nd7MheXeleHFa0q3bkh12chtDD76U9Y-yC0_A5nfOThnBJHPiATpjdsj478Ss9mvx-KDbb6fcXJxWZ7THu8e07hbWzLcOc'
        }
    ],
    newSurname: '',
    newName: '',
    newMiddlename: '',
    newAge: '',
    newPosition: '',
    newSalary: '',
    isDeleted: false,
    isChanged: false
}

const workerReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_USER: {
            let id;

            if (state.workers.length === 0) id = 0;
            else id = Number(state.workers[state.workers.length - 1].id) + 1

            let worker = {
                id: id,
                surname: state.newSurname,
                name: state.newName,
                middlename: state.newMiddlename,
                position: state.newPosition,
                age: state.newAge,
                salary: state.newSalary,
                avatar: 'https://lh3.googleusercontent.com/proxy/nAZhBut55Nd7MheXeleHFa0q3bkh12chtDD76U9Y-yC0_A5nfOThnBJHPiATpjdsj478Ss9mvx-KDbb6fcXJxWZ7THu8e07hbWzLcOc'
            }

            return {
                ...state,
                workers: [...state.workers, worker],
                newSurname: '',
                newName: '',
                newMiddlename: '',
                newAge: '',
                newPosition: '',
                newSalary: ''
            }
        }

        case ADD_CHANGE: {
            return {
                ...state,
                newSurname: action.surname,
                newName: action.name,
                newMiddlename: action.middlename,
                newAge: action.age,
                newPosition: action.position,
                newSalary: action.salary
            }
        }

        case PROFILE_IS_CHANGING: {

            state.newSurname = action.surname
            state.newName = action.name
            state.newMiddlename = action.middlename
            state.newAge = action.age
            state.newPosition = action.position
            state.newSalary = action.salary
            let n = state.workers.find(w => w.id === action.userId);
            n.surname = state.newSurname
            n.name = state.newName
            n.middlename = state.newMiddlename
            n.age = state.newAge
            n.position = state.newPosition
            n.salary = state.newSalary

            return {
                ...state,
                workers: [...state.workers]
            }
        }


        case ACCEPT_PROFILE_CHANGE: {
            return {
                ...state,
                workers: [...state.workers],
                isChanged: true
            }
        }


        case DELETE: {
            let workersArr = state.workers;
            let foundElement = workersArr.find(el => el.id === action.userId)
            workersArr.splice(workersArr.indexOf(foundElement), 1);
            alert('Сотрудник успешно удалён')
            return {
                ...state,
                workers: workersArr,
                isDeleted: true
            }
        }

        case TOGGLE_IS_DELETING: {
            return {
                ...state,
                isDeleted: action.toggle
            }
        }

        case TOGGLE_IS_CHANGING: {
            return {
                ...state,
                isChanged: action.toggle
            }
        }

        default:
            return state;
    }

};

export default workerReducer;

export const changeData = (surname, name, middlename, age, position, salary) => {
    return {
        type: ADD_CHANGE,
        surname, name, middlename, age, position, salary
    }
}

export const isChanging = (userId, surname, name, middlename, age, position, salary) => {
    return {
        type: PROFILE_IS_CHANGING,
        surname, name, middlename, age, position, salary, userId
    }
}

export const changeProfileData = (userId) => {
    return {
        type: ACCEPT_PROFILE_CHANGE,
        userId
    }
}

export const addUser = () => {
    return {
        type: ADD_USER,
    }
}

export const deleteUser = (userId) => {
    return {
        type: DELETE,
        userId
    }
}

export const toggleIsDeleting = (toggle) => {
    return {
        type: TOGGLE_IS_DELETING,
        toggle
    }
}

export const toggleIsChanging = (toggle) => {
    return {
        type: TOGGLE_IS_CHANGING,
        toggle
    }
}