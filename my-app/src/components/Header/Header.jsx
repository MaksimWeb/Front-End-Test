import React from "react";
import style from "./Header.module.css";
import {AppBar, Container, Toolbar} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    header: {
        textAlign: 'center'
    },
    text: {
        margin: '0 auto'
    }
}))

const Header = () => {
    const classes = useStyles();
    return (
        <AppBar className={classes.header}>
            <Container   fixed>
                <Toolbar>
                    <p className={classes.text}>Смарт-Доход - приложение для подсчёта доходов</p>
                </Toolbar>

            </Container>
        </AppBar>
    )
}

export default Header;