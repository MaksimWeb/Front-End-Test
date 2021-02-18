import React, {useEffect, useReducer, useState} from "react";
import style from "./Workers.module.css"
import {NavLink} from "react-router-dom";
import {Formik, Field, Form} from 'formik';
import {Button, InputLabel, TextField} from "@material-ui/core";

const Workers = (props) => {

    let [workers, setNewArr] = useState(props.workers)

    useEffect(() => {

    }, [props.workers.summary])


    let filter = (sum) => {
        let newWorkersArr = props.workers.filter(el => {
            let calculate = el.profit.reduce((accum, elem) => accum + elem.salary, 0)
            if (calculate > sum) return true;

            return false;
        })

        newWorkersArr.length >= 1 && setNewArr(newWorkersArr)
    }

    let reset = () => {
        setNewArr(props.workers);
    }

    return (
        <div className={style.workersBlock}>
            <div>
                <FilterForm filter={filter} reset={reset}/>
            </div>
            <div>
                {
                    workers.map(w => <div>
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
        </div>
    )
}

function validationFilter(value) {
    let error;
    const symbols = (/^[^0-9]*$/);

    if (symbols.test(value)) error = 'Некорректные данные'

    return error;
}

const FilterForm = (props) => {

    return (
        <div>

            <Formik
                initialValues={{
                    sum: '',
                }}

                onSubmit={async (values) => {
                    props.filter(values.sum);
                }}
            >
                {({values, errors, touched}) => (
                    <Form className={style.form}>
                        <InputLabel htmlFor='filterSum'>Фильтр списка</InputLabel>
                        <Field className={style.formField} id="filterSum" name="sum"
                               placeholder="Введите сумму дохода"
                               as={TextField} validate={validationFilter}/>
                        {errors.sum && touched.sum ? (<div>{errors.sum}</div>
                        ) : null}

                        <div>
                            <Button type="submit">Поиск</Button>
                            <Button onClick={props.reset}>Сброс</Button>
                        </div>
                    </Form>
                )}

            </Formik>
        </div>
    )
}

export default Workers;