import React from "react";
import style from "./Workers.module.css"
import {NavLink} from "react-router-dom";

const Workers = (props) => {
    return (
        <div className={style.workersBlock}>
            {
                props.workers.map(w => <div>
                    <NavLink className={style.link} to={'/profile/'+ w.id}>
                        <ul className={style.list}>
                            <li>{w.surname}</li>
                            <li>{w.name}</li>
                            <li>{w.middlename}</li>
                            <li>Возраст: {w.age}</li>
                            <li>Должность: {w.position}</li>
                            <li>Зарплата: {w.salary} руб.</li>
                        </ul>
                    </NavLink>
                </div>)
            }
        </div>
    )
}

export default Workers;