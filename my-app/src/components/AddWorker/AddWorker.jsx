import React, {useReducer} from "react";
import style from "./AddWorker.module.css"
import {Formik, Field, Form} from 'formik';
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import * as Yup from 'yup';
import {Redirect} from "react-router-dom";

const symbols = (/^[^0-9]*$/);

const SignupSchema = Yup.object().shape({
    workerSurname: Yup.string()
        .min(2, 'Мало символов!')
        .max(50, 'Слишком длинное!')
        .required('Обязательное поле')
        .matches(symbols, 'Неверный формат фамилии'),
    workerName: Yup.string()
        .min(2, 'Мало символов!')
        .max(50, 'Слишком длинное!')
        .required('Обязательное поле')
        .matches(symbols, 'Неверный формат имени'),
    workerMiddlename: Yup.string()
        .max(50, 'Слишком длинное!')
        .required('Обязательное поле')
        .matches(symbols, 'Неверный формат отчества'),
    workerPosition: Yup.string().required('Обязательное поле'),
    workerAge: Yup.number()
        .integer('Возраст не может быть дробным числом')
        .required('Обязательное поле')
        .positive('Возраст не может быть отрицательным'),
    workerSalary: Yup.number()
        .integer('ЗП не может быть дробным числом')
        .required('Обязательное поле')
        .positive('ЗП не может быть отрицательным')
});


const AddWorker = (props) => {

    let onAddUser = (values) => {
        props.addUser(values);
    }

    return (
        <div className={style.workersBlock}>
            <h1 className={style.header}>Форма добавления нового сотрудника</h1>
            <AddWorkerForm addUser={onAddUser}/>
        </div>
    )
}

const AddWorkerForm = (props) => {

    const initialState = false;

    function reducer(state, action) {
        switch (action.type) {
            case 'submit': {
                return true;
            }
            default:
                throw new Error();
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    if (state) {
        return <Redirect to={'/workers'}/>
    }

    return (
        <div>
            <Formik
                initialValues={{
                    workerSurname: '',
                    workerName: '',
                    workerMiddlename: '',
                    workerAge: '',
                    workerPosition: '',
                    workerSalary: '',
                }}
                validationSchema={SignupSchema}
                onSubmit={async (values) => {
                    props.addUser(values)
                    dispatch({type: 'submit'})
                }}
            >
                {({values, errors, touched}) => (
                    <Form className={style.form}>
                        <InputLabel htmlFor='lastName'>Фамилия</InputLabel>
                        <Field className={style.formField} id="lastName" name="workerSurname"
                               placeholder="Введите фамилию"
                               as={TextField}/>
                        {errors.workerSurname && touched.workerSurname ? (<div>{errors.workerSurname}</div>
                        ) : null}

                        <InputLabel htmlFor='firstName'>Имя</InputLabel>
                        <Field className={style.formField} id="firstName" name="workerName" placeholder="Введите имя"
                               as={TextField}/>
                        {errors.workerName && touched.workerName ? (<div>{errors.workerName}</div>
                        ) : null}

                        <InputLabel htmlFor='middleName'>Отчество</InputLabel>
                        <Field className={style.formField} id="middleName" name="workerMiddlename"
                               placeholder="Введите отчество" as={TextField}/>
                        {errors.workerMiddlename && touched.workerMiddlename ? (<div>{errors.workerMiddlename}</div>
                        ) : null}

                        <InputLabel htmlFor='age'>Возраст</InputLabel>
                        <Field className={style.formField} id="age" name="workerAge" type="number"
                               placeholder="Введите возраст сотрудника" as={TextField}/>
                        {errors.workerAge && touched.workerAge ? (<div>{errors.workerAge}</div>
                        ) : null}

                        <InputLabel htmlFor='position'>Должность</InputLabel>
                        <Field className={style.formField} as={Select} id="position" name="workerPosition">
                            <MenuItem value="Front-End">Front-End</MenuItem>
                            <MenuItem value="Back-End">Back-End</MenuItem>
                            <MenuItem value="Верстальщик">Верстальщик</MenuItem>
                        </Field>
                        {errors.workerPosition && touched.workerPosition ? (<div>{errors.workerPosition}</div>
                        ) : null}

                        <InputLabel htmlFor='salary'>Заработная плата (руб.)</InputLabel>
                        <Field className={style.formField} id="salary" name="workerSalary" type="number"
                               placeholder="Введите зп сотрудника" as={TextField}/>
                        {errors.workerSalary && touched.workerSalary ? (<div>{errors.workerSalary}</div>
                        ) : null}

                        <div>
                            <Button variant='contained' color='primary' type="submit">Добавить сотрудника</Button>
                        </div>

                    </Form>
                )}

            </Formik>
        </div>
    )

};

export default AddWorker;