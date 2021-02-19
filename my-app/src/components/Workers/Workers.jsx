import React, {useEffect, useState} from "react";
import style from "./Workers.module.css"
import {NavLink} from "react-router-dom";
import {Formik, Field, Form} from 'formik';
import {Button, InputLabel, TextField} from "@material-ui/core";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";


function MyTable(props) {
    return (
        <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Фамилия</TableCell>
                        <TableCell align="right">Имя</TableCell>
                        <TableCell align="right">Отчество</TableCell>
                        <TableCell align="right">Возраст</TableCell>
                        <TableCell align="right">Должность</TableCell>
                        <TableCell align="right">Заработная плата</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.workers.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                                {row.surname}
                            </TableCell>
                            <TableCell align="right">{row.name}</TableCell>
                            <TableCell align="right">{row.middlename}</TableCell>
                            <TableCell align="right">{row.age}</TableCell>
                            <TableCell align="right">{row.position}</TableCell>
                            <TableCell align="right">{row.salary}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

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
                                <li className={style.listItem}>{w.surname}</li>
                                <li className={style.listItem}>{w.name}</li>
                                <li className={style.listItem}>{w.middlename}</li>
                                <li className={style.listItem}>Возраст: {w.age}</li>
                                <li className={style.listItem}>Должность: {w.position}</li>
                                <li className={style.listItem}>Зарплата: {w.salary} руб.</li>
                                <li className={style.listItem}>Доход: {w.profit.reduce((accum, elem) => accum + elem.salary, 0)} руб.</li>
                            </ul>
                        </NavLink>
                    </div>)
                }
            </div>
            <div>
                <MyTable workers={props.workers}/>
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