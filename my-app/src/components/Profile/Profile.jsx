import React from "react";
import style from "./Profile.module.css"
import {Redirect} from 'react-router-dom';
import {Formik, Field, Form, FieldArray} from 'formik';
import {Button, InputLabel, TextField} from "@material-ui/core";
import * as Yup from 'yup';



const SignupSchema = Yup.object().shape({
    editedSurname: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required')
        .matches(/^(?=.*?[А-яа-я])[А-яа-я+]+$/, 'Invalid surname')
    // lastName: Yup.string()
    //     .min(2, 'Too Short!')
    //     .max(50, 'Too Long!')
    //     .required('Required'),
    // email: Yup.string().email('Invalid email').required('Required'),
});

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
                editedProfit: props.profile.profit
            }}
            validationSchema={SignupSchema}
            onSubmit={async (values) => {
                props.changeData(values, props.profile.id)
            }}
        >
            {({values, errors, touched}) => (
                <Form className={style.form}>
                    <InputLabel htmlFor='lastName'>Фамилия</InputLabel>
                    <Field className={style.formField} id="lastName" name="editedSurname" placeholder="Введите фамилию"
                           as={TextField}/>
                    {errors.editedSurname && touched.editedSurname ? (<div>{errors.editedSurname}</div>
                    ) : null}

                    <InputLabel htmlFor='firstName'>Имя</InputLabel>
                    <Field className={style.formField} id="firstName" name="editedName" placeholder="Введите имя"
                           as={TextField}/>

                    <InputLabel htmlFor='middleName'>Отчество</InputLabel>
                    <Field className={style.formField} id="middleName" name="editedMiddlename"
                           placeholder="Введите отчество" as={TextField}/>

                    <InputLabel htmlFor='age'>Возраст</InputLabel>
                    <Field className={style.formField} id="age" name="editedAge" type="number"
                           placeholder="Введите вораст сотрудника" as={TextField}/>

                    <InputLabel htmlFor='position'>Должность</InputLabel>
                    <Field className={style.formField} id="position" name="editedPosition"
                           placeholder="Введите должность сотрудника" as={TextField}/>

                    <InputLabel htmlFor='salary'>Заработная плата (руб.)</InputLabel>
                    <Field className={style.formField} id="salary" name="editedSalary" type="number"
                           placeholder="Введите зп сотрудника" as={TextField}/>

                    <div>
                        <FieldArray name='editedProfit'>
                            {(arrayHelpers) => (
                                <div>
                                    <Button onClick={() => arrayHelpers.push({
                                        name: '',
                                        age: ''
                                    })}>Добавить доход</Button>
                                    {values.editedProfit.map((profit, index) => {
                                        return (
                                            <div key={profit.salary}>
                                                <Field as={TextField} type="number" placeholder='Заработок'
                                                       name={`editedProfit.${index}.salary`}/>
                                                <Field as={TextField} type='date' placeholder='Месяц'
                                                       name={`editedProfit.${index}.date`}/>

                                                <Button onClick={() => arrayHelpers.remove(index)}>x</Button>
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                            }
                        </FieldArray>
                        <Button type="submit">Сохранить изменения</Button>
                        <Button onClick={props.deleteUser} className={style.button} type='submit'>Удалить
                            сотрудника</Button>
                    </div>

                    <pre>
                                 {JSON.stringify(values, null, 2)}
                             </pre>
                </Form>
            )}

        </Formik>
    </div>
);

export default Profile;