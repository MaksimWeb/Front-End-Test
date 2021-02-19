import React from "react";
import style from "./Header.module.css";
import {AppBar, Container, Toolbar} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import Navbar, {MenuButton} from "../Navbar/Navbar";

const useStyles = makeStyles((theme) => ({
    header: {
        display: "flex",
        alignItems: "center",
        columnGap: "40%"
    },

}))

const Header = () => {
    const classes = useStyles();
    return (
        <AppBar>
                <Toolbar className={classes.header}>
                    <Navbar/>
                    <p className={classes.text}>Смарт-Доход - приложение для подсчёта доходов</p>
                </Toolbar>
        </AppBar>
    )
}

export default Header;