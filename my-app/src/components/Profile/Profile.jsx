import React from "react";
import style from "./Profile.module.css"
import {Redirect} from 'react-router-dom';
import {Formik, Field, Form, FieldArray} from 'formik';


const Profile = (props) => {

    let deleteUser = () => props.deleteUser(props.profile.id);
    let changeUser = (values, id) => props.changeProfileData(values, id);
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
            <h1>Редактирование профиля</h1>
            <img className={style.workerAvatar} src={props.profile.avatar} alt="Аватар"/>
            <Basic profile={props.profile} changeData={changeUser} deleteUser={deleteUser}/>
        </div>
    )
}

const Basic = (props) => (
    <div>

        <Formik
            initialValues={{
                editedSurname: props.profile.surname,
                editedName: props.profile.name,
                editedMiddlename: props.profile.middlename,
                editedAge: props.profile.age,
                editedPosition: props.profile.position,
                editedSalary: props.profile.salary,

            }}
            onSubmit={async (values) => {
                props.changeData(values, props.profile.id)
            }}
        >

            <Form>
                <label htmlFor="lastName">Фамилия</label>
                <Field id="lastName" name="editedSurname" placeholder="Введите фамилию"/>

                <label htmlFor="firstName">Имя</label>
                <Field id="firstName" name="editedName" placeholder="Введите имя"/>

                <label htmlFor="middleName">Отчество</label>
                <Field id="middleName" name="editedMiddlename" placeholder="Введите отчество"/>

                <label htmlFor="age">Возраст</label>
                <Field id="age" name="editedAge" type="number" placeholder="Введите вораст сотрудника"/>

                <label htmlFor="position">Должность</label>
                <Field id="position" name="editedPosition" placeholder="Введите должность сотрудника"/>

                <label htmlFor="salary">Заработная плата (руб.)</label>
                <Field id="salary" name="editedSalary" type="number" placeholder="Введите зп сотрудника"/>


                <button type="submit" className={style.button}>Сохранить изменения</button>
                <button onClick={props.deleteUser} className={style.button} type='submit'>Удалить сотрудника</button>
            </Form>
        </Formik>
    </div>
);

export default Profile;