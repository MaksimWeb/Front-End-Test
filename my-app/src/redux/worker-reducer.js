import React from "react";

const ADD_USER = 'ADD_USER';
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
            avatar: 'https://media.istockphoto.com/vectors/support-icon-vector-female-construction-service-worker-person-profile-vector-id1140360467'
        },
        {
            id: 2,
            surname: 'Samson',
            name: 'Chris',
            middlename: 'O',
            age: 20,
            position: 'Back-End',
            salary: '13000',
            avatar: 'https://media.istockphoto.com/vectors/support-icon-vector-female-construction-service-worker-person-profile-vector-id1140360467'
        },
        {
            id: 3,
            surname: 'Lor',
            name: 'Vit',
            middlename: 'Kop',
            age: 22,
            position: 'Верстальщик',
            salary: '50000',
            avatar: 'https://media.istockphoto.com/vectors/support-icon-vector-female-construction-service-worker-person-profile-vector-id1140360467'
        }
    ],
    isDeleted: false,
    isChanged: false,
    newArr: []
}


const workerReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_USER: {
            let id;

            if (state.workers.length === 0) id = 0;
            else id = Number(state.workers[state.workers.length - 1].id) + 1

            let worker = {
                id: id,
                surname: action.newWorkerInfo.workerSurname,
                name: action.newWorkerInfo.workerName,
                middlename: action.newWorkerInfo.workerMiddlename,
                position: action.newWorkerInfo.workerPosition,
                age: action.newWorkerInfo.workerAge,
                salary: action.newWorkerInfo.workerSalary,
                avatar: 'https://media.istockphoto.com/vectors/support-icon-vector-female-construction-service-worker-person-profile-vector-id1140360467'
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

        case PROFILE_IS_CHANGING: {

            let users = [...state.workers]
            let n = users.find(w => w.id === action.userId);
            n.surname = action.surname
            n.name = action.name
            n.middlename = action.middlename
            n.age = action.age
            n.position = action.position
            n.salary = action.salary

            return {
                ...state,
                workers: [...state.workers],
                newSurname: action.surname,
                newName: action.name,
                newMiddlename: action.middlename,
                newAge: action.age,
                newPosition: action.position,
                newSalary: action.salary,
                newArr: users
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

export const addUser = (newWorkerInfo) => {
    return {
        type: ADD_USER,
        newWorkerInfo
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
