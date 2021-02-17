import React, {useReducer} from "react";
import style from "./AddWorker.module.css"
import {Formik, Field, Form} from 'formik';
import {Button, InputLabel, TextField} from "@material-ui/core";
import * as Yup from 'yup';
import {Redirect} from "react-router-dom";

const symbols = (/^[^0-9]*$/);

const SignupSchema = Yup.object().shape({
    workerSurname: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required')
        .matches(symbols, 'Invalid surname'),
    workerName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required')
        .matches(symbols, 'Invalid name'),
    workerMiddlename: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required')
        .matches(symbols, 'Invalid middlename'),
    workerPosition: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required')
        .matches(symbols, 'Invalid position')
});


const AddWorker = (props) => {

    let onAddUser = (values) => {
        props.addUser(values);
    }

    return (
        <div>
            <h1>Форма добавления нового сотрудника</h1>
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
                    dispatch({type:'submit'})
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

                        <InputLabel htmlFor='position'>Должность</InputLabel>
                        <Field className={style.formField} id="position" name="workerPosition"
                               placeholder="Введите должность сотрудника" as={TextField}/>
                        {errors.workerPosition && touched.workerPosition ? (<div>{errors.workerPosition}</div>
                        ) : null}

                        <InputLabel htmlFor='salary'>Заработная плата (руб.)</InputLabel>
                        <Field className={style.formField} id="salary" name="workerSalary" type="number"
                               placeholder="Введите зп сотрудника" as={TextField}/>

                        <div>
                            <Button type="submit">Добавить сотрудника</Button>
                        </div>

                    </Form>
                )}

            </Formik>
        </div>
    )

};

export default AddWorker;