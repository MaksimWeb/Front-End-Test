import React from "react";
import style from "./AddWorker.module.css"

const AddWorker = (props) => {

    let onAddUser = () => {
        props.addUser();
    }

    let newSurname = React.createRef();
    let newName = React.createRef();
    let newMiddlename = React.createRef();
    let newAge = React.createRef();
    let newPosition = React.createRef();
    let newSalary = React.createRef();

    let onChangeUserData = () => {
        let surnameValue = newSurname.current.value;
        let nameValue = newName.current.value;
        let middlenameValue = newMiddlename.current.value;
        let ageValue = newAge.current.value;
        let positionValue = newPosition.current.value;
        let salaryValue = newSalary.current.value;
        props.changeData(surnameValue, nameValue, middlenameValue, ageValue, positionValue, salaryValue)
    }

    return (
        <div className={style.workersBlock}>
            <label>
                Фамилия
                <input ref={newSurname} onChange={onChangeUserData} type="text" value={props.workers.newSurname}/>
            </label>
            <label>
                Имя
                <input ref={newName} onChange={onChangeUserData} type="text" value={props.workers.newName}/>
            </label>
            <label>
                Отчество
                <input ref={newMiddlename} onChange={onChangeUserData} type="text" value={props.workers.newMiddlename}/>
            </label>
            <label>
                Возраст
                <input ref={newAge} onChange={onChangeUserData} type="number" value={props.workers.newAge}/>
            </label>
            <label>
                Должность
                <input ref={newPosition}  onChange={onChangeUserData} type="text" value={props.workers.newPosition}/>
            </label>
            <label>
                Заработная плата (руб.)
                <input ref={newSalary} onChange={onChangeUserData} type="number" value={props.workers.newSalary}/>
            </label>
            <button onClick={onAddUser} type='submit'>Добавить</button>
        </div>
    )
}

export default AddWorker;