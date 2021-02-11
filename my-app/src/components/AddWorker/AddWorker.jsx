import React from "react";
import style from "./AddWorker.module.css"
import {Field, reduxForm} from "redux-form";

const AddWorker = (props) => {

    let onAddUser = (values) => {
         props.addUser(values);
    }

    return (
        <div>
            <h1>Форма добавления нового сотрудника</h1>
            <AddWorkerReduxForm onSubmit={onAddUser}/>
        </div>
    )
}

const AddWorkerForm = (props) => {
    return  <form onSubmit={props.handleSubmit}className={style.workersBlock}>

        <div>
            Фамилия
            <Field className={style.input} name="workerSurname" component="input" placeholder="Введите фамилию"/>
        </div>
       <div>
           Имя
           <Field className={style.input} name="workerName" component="input" placeholder="Введите имя"/>
       </div>
        <div>
            Отчество
            <Field className={style.input} name="workerMiddlename" component="input" placeholder="Введите отчество"/>
        </div>
        <div>
            Возраст
            <Field className={style.input} name="workerAge" component="input" type="number" placeholder="Введите возраст сотрудника"/>
        </div>
        <div>
            Должность
            <Field className={style.input} name="workerPosition" component="input" placeholder="Введите должность сотрудника"/>
        </div>
        <div>
            Заработная плата (руб.)
            <Field className={style.input} name="workerSalary" component="input" type="number" placeholder="Введите зп сотрудника"/>
        </div>
        <button>Добавить</button>
    </form>
}

const AddWorkerReduxForm = reduxForm ({form:'addWorker'}) (AddWorkerForm)

export default AddWorker;