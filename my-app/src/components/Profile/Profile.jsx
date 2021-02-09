import React from "react";
import style from "./Profile.module.css"

const Profile = (props) => {
    return (
        <div className={style.profileBlock}>
            <ul>
                <li>Фамилия: {props.profile?.surname}</li>
                <li>Имя: {props.profile?.name}</li>
                <li>Отчество: {props.profile?.middlename}</li>
                <li>Возраст: {props.profile?.age}</li>
                <li>Должность: {props.profile?.position}</li>
            </ul>
        </div>
    )
}

export default Profile;