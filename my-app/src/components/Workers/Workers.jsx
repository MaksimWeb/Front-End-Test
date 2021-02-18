import React, {useEffect} from "react";
import style from "./Workers.module.css"
import {NavLink} from "react-router-dom";
import {Formik, Field, Form, FieldArray} from 'formik';
import {Button, InputLabel, TextField} from "@material-ui/core";
import {Profit} from "../../redux/worker-reducer";

const Workers = (props) => {

    useEffect(() => {

    }, [props.workers.summary])

    return (
        <div className={style.workersBlock}>
            <FilterForm/>
            {
                props.workers.map(w => <div>
                    <NavLink className={style.link} to={'/profile/' + w.id}>
                        <ul className={style.list}>
                            <li>{w.surname}</li>
                            <li>{w.name}</li>
                            <li>{w.middlename}</li>
                            <li>Возраст: {w.age}</li>
                            <li>Должность: {w.position}</li>
                            <li>Зарплата: {w.salary} руб.</li>
                            <li>Доход: {w.profit.reduce((accum, elem) => accum + elem.salary, 0)} руб.</li>
                        </ul>
                    </NavLink>
                </div>)
            }
        </div>
    )
}

const FilterForm = (props) => {
    return (
        <div>

            <Formik
                initialValues={{

                }}

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


                        <Button type="submit">Сохранить изменения</Button>


                    </Form>
                )}

            </Formik>
        </div>
    )
}

export default Workers;