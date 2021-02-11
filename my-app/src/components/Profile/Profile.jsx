import React from "react";
import style from "./Profile.module.css"
import {Redirect} from 'react-router-dom';
import {Field, reduxForm} from "redux-form";
import {Input} from "../../Common/FormControls/FormControls";

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


    return (
        <div className={style.profileBlock}>
            <img className={style.workerAvatar} src={props.profile.avatar} alt="Аватар"/>
            <EditProfileReduxForm profile={props.profile} />
            <button onClick={changeUser} className={style.button} type='submit'>Сохранить изменения</button>
            <button onClick={deleteUser} className={style.button} type='submit'>Удалить сотрудника</button>
        </div>
    )
}

const editProfileForm = (props) => {

    return <form onSubmit={props.handleSubmit}>
        <label>
            Фамилия
            <Field name="editedSurname" component={Input(props.profile)} />
        </label>
        <label>
            Имя
            <Field name="editedName" component="input" value={props.profile.surname}/>
        </label>
        <label>
            Отчество
            <Field name="editedMiddlename" component="input" value={props.profile.surname}/>
        </label>
        <label>
            Возраст
            <Field name="editedAge" component="input" type="number" value={props.profile.surname}/>
        </label>
        <label>
            Должность
            <Field name="editedPosition" component="input" value={props.profile.surname}/>
        </label>
        <label>
            Заработная плата (руб.)
            <Field name="editedSalary" component="input" type="number" value={props.profile.surname}/>
        </label>
    </form>
}

const EditProfileReduxForm = reduxForm ({form:'editProfileForm'}) (editProfileForm);

export default Profile;