import React from "react";

const ADD_USER = 'ADD_USER';
const ACCEPT_PROFILE_CHANGE = 'ACCEPT_PROFILE_CHANGE';
const DELETE = 'DELETE';
const TOGGLE_IS_DELETING = 'TOGGLE_IS_DELETING';
const TOGGLE_IS_CHANGING = 'TOGGLE_IS_CHANGING';


export class Profit {
    constructor(id, salary, date) {
        this.id = id
        this.salary = salary
        this.date = date
    }
}

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
            avatar: 'https://media.istockphoto.com/vectors/support-icon-vector-female-construction-service-worker-person-profile-vector-id1140360467',
            profit: [
                new Profit(1, 130000, '2019-02-03'),
                new Profit(2, 130000, '2010-10-13')
            ]
        },
        {
            id: 2,
            surname: 'Samson',
            name: 'Chris',
            middlename: 'Os',
            age: 20,
            position: 'Back-End',
            salary: '13000',
            avatar: 'https://media.istockphoto.com/vectors/support-icon-vector-female-construction-service-worker-person-profile-vector-id1140360467',
            profit: [
                new Profit(1, 13000, '2021-12-31')
            ]
        },
        {
            id: 3,
            surname: 'Lor',
            name: 'Vit',
            middlename: 'Kop',
            age: 22,
            position: 'Верстальщик',
            salary: '50000',
            avatar: 'https://media.istockphoto.com/vectors/support-icon-vector-female-construction-service-worker-person-profile-vector-id1140360467',
            profit: [
                new Profit(1, 50000, '2000-05-05')
            ]
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
                profit: [],
                avatar: 'https://media.istockphoto.com/vectors/support-icon-vector-female-construction-service-worker-person-profile-vector-id1140360467'
            }

            return {
                ...state,
                workers: [...state.workers, worker],
            }
        }


        case ACCEPT_PROFILE_CHANGE: {
            let arr = [...state.workers]
            let user = arr.find(el => el.id === action.userId)
            user.surname = action.worker.editedSurname
            user.name = action.worker.editedName
            user.middlename = action.worker.editedMiddlename
            user.age = action.worker.editedAge
            user.position = action.worker.editedPosition
            user.salary = action.worker.editedSalary
            user.profit = action.worker.editedProfit
            return {
                ...state,
                workers: [...arr],
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


export const changeProfileData = (worker, userId) => {
    return {
        type: ACCEPT_PROFILE_CHANGE,
        userId,
        worker
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
