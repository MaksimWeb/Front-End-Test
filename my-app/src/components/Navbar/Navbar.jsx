import React from "react";
import style from "./Navbar.module.css";
import {NavLink} from "react-router-dom";

const Navbar = () => {
    return (
        <nav className={style.navbarBlock}>
            <div>
                <NavLink to={'/workers'} className={style.item}>Список сотрудников</NavLink>
            </div>
            <div>
                <NavLink to={'profile'} className={style.item}>Профиль</NavLink>
            </div>

        </nav>
    )
};

export default Navbar;