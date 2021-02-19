import React, {useState} from "react";
import style from "./Navbar.module.css";
import {NavLink} from "react-router-dom";
import {Button, Drawer, ListItemIcon, MenuItem, MenuList, Typography} from "@material-ui/core";
import {AiOutlineOrderedList, AiOutlinePlusSquare, AiOutlineMenu, AiFillEdit} from "react-icons/ai"

const Navbar = () => {
    const [openDrawer, setOpenDrawer] = useState(false)
    return (
        <div>
            <Button onClick={() => setOpenDrawer(true)}>
                <AiOutlineMenu/>
            </Button>
            <Drawer onClose={() => setOpenDrawer(false)} open={openDrawer}>
                <MenuList>
                    <MenuItem onClick={() => setOpenDrawer(false)}>
                        <ListItemIcon>
                            <AiOutlineOrderedList/>
                        </ListItemIcon>
                        <NavLink to={'/workers'} className={style.item}>
                            <Typography color='textPrimary' variant="h4">
                                Список сотрудников
                            </Typography>
                        </NavLink>
                    </MenuItem>
                    <MenuItem onClick={() => setOpenDrawer(false)}>
                        <ListItemIcon>
                            <AiFillEdit/>
                        </ListItemIcon>
                        <NavLink to={'/profile'} className={style.item}>
                            <Typography color='textPrimary' variant="h4">
                                Профиль
                            </Typography>
                        </NavLink>
                    </MenuItem>
                    <MenuItem onClick={() => setOpenDrawer(false)}>
                        <ListItemIcon>
                            <AiOutlinePlusSquare/>
                        </ListItemIcon>
                        <NavLink to={'/adduser'} className={style.item}>
                            <Typography color='textPrimary' variant="h4">
                                Добавить сотрудника
                            </Typography>
                        </NavLink>
                    </MenuItem>
                </MenuList>
            </Drawer>
        </div>
    )
};

export default Navbar;