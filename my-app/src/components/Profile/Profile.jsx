import React from "react";
import style from "./Profile.module.css"
import {Redirect} from 'react-router-dom';

const Profile = (props) => {

    let deleteUser = () => props.deleteUser(props.profile.id);
    let changeUser = () => props.changeProfileData(props.profile.id);
    let changeState = () => props.toggleIsDeleting(false);
    let changeData = () => props.toggleIsChanging(false);

    if (props.workers.isDeleted == true) {
        changeState();
        return <Redirect to={'/workers'}/>
    }

    if (props.workers.isChanged == true) {
        changeData();
        return <Redirect to={'/workers'}/>
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
        props.isChanging(props.profile.id, surnameValue, nameValue, middlenameValue, ageValue, positionValue, salaryValue)
    }
    return (
        <div className={style.profileBlock}>
            <img src={props.profile.avatar} alt="Аватар"/>
            <ul>
                <label>
                    Фамилия
                    <input ref={newSurname} onChange={onChangeUserData} type="text" value={props.profile.surname}/>
                </label>
                <label>
                    Имя
                    <input ref={newName} onChange={onChangeUserData} type="text" value={props.profile.name}/>
                </label>
                <label>
                    Отчество
                    <input ref={newMiddlename} onChange={onChangeUserData} type="text" value={props.profile.middlename}/>
                </label>
                <label>
                    Возраст
                    <input ref={newAge} onChange={onChangeUserData} type="number" value={props.profile.age}/>
                </label>
                <label>
                    Должность
                    <input ref={newPosition} onChange={onChangeUserData} type="text" value={props.profile.position}/>
                </label>
                <label>
                    Заработная плата (руб.)
                    <input ref={newSalary} onChange={onChangeUserData} type="number" value={props.profile.salary}/>
                </label>
            </ul>
            <button onClick={changeUser} className={style.button} type='submit'>Сохранить изменения</button>
            <button onClick={deleteUser} className={style.button} type='submit'>Удалить сотрудника</button>
        </div>
    )
}

export default Profile;