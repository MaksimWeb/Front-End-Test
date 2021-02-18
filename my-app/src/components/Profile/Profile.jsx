import React, {useEffect, useReducer, useState} from "react";
import style from "./Profile.module.css"
import {Redirect} from 'react-router-dom';
import {Formik, Field, Form, FieldArray} from 'formik';
import {Button, InputLabel, TextField} from "@material-ui/core";
import * as Yup from 'yup';
import {Profit} from "../../redux/worker-reducer";

const symbols = (/^[^0-9]*$/);

const SignupSchema = Yup.object().shape({
    editedSurname: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required')
        .matches(symbols, 'Invalid surname'),
    editedName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required')
        .matches(symbols, 'Invalid name'),
    editedMiddlename: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required')
        .matches(symbols, 'Invalid middlename'),
    editedPosition: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required')
        .matches(symbols, 'Invalid position'),
    editedProfit: Yup.array().of(
        Yup.object({
            salary: Yup.string().required()
        })
    )
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

const Basic = (props) => {

    const euro = 88.74;
    const dollar = 73.72;

    let initialState = props.profile.profit.reduce((accum, elem) => accum + elem.salary, 0)
    let isClickedDollars = false;
    let isClickedEuros = false;

    useEffect(() => {

    }, [initialState])


    function reducer(state, action) {
        switch (action.type) {
            case 'CONVERT_TO_DOLLARS': {
                if (dollar) {
                    isClickedDollars = true;
                    isClickedEuros = false;
                    return initialState * dollar
                } else {
                    alert('Отсутствует курс для данной валюты')
                    return initialState
                }
            }
            case 'CONVERT_TO_EURO': {
                if (euro) {
                    isClickedEuros = true;
                    isClickedDollars = false;
                    return initialState * euro
                } else {
                    alert('Отсутствует курс для данной валюты')
                    return initialState
                }
            }
            case 'RESET': {
                isClickedEuros = false;
                isClickedDollars = false;
                return initialState;
            }
            default:
                throw new Error();
        }
    }

    let [state, dispatch] = useReducer(reducer, initialState);

    return (
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
                        <Field className={style.formField} id="lastName" name="editedSurname"
                               placeholder="Введите фамилию"
                               as={TextField}/>
                        {errors.editedSurname && touched.editedSurname ? (<div>{errors.editedSurname}</div>
                        ) : null}

                        <InputLabel htmlFor='firstName'>Имя</InputLabel>
                        <Field className={style.formField} id="firstName" name="editedName" placeholder="Введите имя"
                               as={TextField}/>
                        {errors.editedName && touched.editedName ? (<div>{errors.editedName}</div>
                        ) : null}

                        <InputLabel htmlFor='middleName'>Отчество</InputLabel>
                        <Field className={style.formField} id="middleName" name="editedMiddlename"
                               placeholder="Введите отчество" as={TextField}/>
                        {errors.editedMiddlename && touched.editedMiddlename ? (<div>{errors.editedMiddlename}</div>
                        ) : null}

                        <InputLabel htmlFor='age'>Возраст</InputLabel>
                        <Field className={style.formField} id="age" name="editedAge" type="number"
                               placeholder="Введите возраст сотрудника" as={TextField}/>

                        <InputLabel htmlFor='position'>Должность</InputLabel>
                        <Field className={style.formField} id="position" name="editedPosition"
                               placeholder="Введите должность сотрудника" as={TextField}/>
                        {errors.editedPosition && touched.editedPosition ? (<div>{errors.editedPosition}</div>
                        ) : null}

                        <InputLabel htmlFor='salary'>Заработная плата (руб.)</InputLabel>
                        <Field className={style.formField} id="salary" name="editedSalary" type="number"
                               placeholder="Введите зп сотрудника" as={TextField}/>

                        <div>
                            <FieldArray name='editedProfit'>
                                {(arrayHelpers) => (
                                    <div>
                                        <Button onClick={() => arrayHelpers.push(new Profit(
                                            values.editedProfit.length + 1,
                                            '',
                                            ''
                                        ))}>Добавить доход</Button>
                                        {values.editedProfit.map((profit, index) => {

                                            return (
                                                <div className={style.arrayField} key={profit.id}>
                                                    <Field as={TextField} type="number" placeholder='Заработок'
                                                           name={`editedProfit.${index}.salary`}/>
                                                    <Field as={TextField} type='date' placeholder='Месяц'
                                                           name={`editedProfit.${index}.date`}/>
                                                    <Button onClick={() => arrayHelpers.remove(index)}>x</Button>
                                                </div>
                                            )
                                        })}

                                        {

                                        }

                                        {isClickedDollars &&
                                        <InputLabel htmlFor='summary'>Итог (доллары)</InputLabel>
                                        }
                                        {isClickedEuros &&
                                        <InputLabel htmlFor='summary'>Итог (евро)</InputLabel>
                                        }

                                        {!isClickedDollars && !isClickedEuros &&
                                        <InputLabel htmlFor='summary'>Итог (руб.)</InputLabel>
                                        }

                                        <Field id="summary" as={TextField} value={state}/>
                                        <Button disabled={isClickedDollars}
                                                onClick={() => dispatch({type: 'CONVERT_TO_DOLLARS'})}>Перевести в
                                            доллары</Button>
                                        <Button disabled={isClickedEuros}
                                                onClick={() => dispatch({type: 'CONVERT_TO_EURO'})}>Перевести в
                                            евро</Button>
                                        <Button
                                            onClick={() => dispatch({type: 'RESET'})}>Сброс</Button>

                                    </div>
                                )
                                }
                            </FieldArray>


                            <Button type="submit">Сохранить изменения</Button>
                            <Button onClick={props.deleteUser} className={style.button} type='submit'>Удалить
                                сотрудника</Button>
                        </div>
                        <Button onClick={() => console.log(values.editedProfit[0].date)}>rr</Button>
                        <Button onClick={() => console.log(values.editedProfit[0].date.slice(0, 4))}>rr</Button>
                        <pre>
                            {JSON.stringify(values, null, 2)}
                                </pre>
                    </Form>
                )}

            </Formik>
        </div>
    )


};

export default Profile;