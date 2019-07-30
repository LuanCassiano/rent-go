import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'

import useStyles from './styles'

export default function Navbar() {
    const classes = useStyles()

    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    function handleMenu(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }


    return (
        <div className={classes.root}>
            <AppBar position="absolute" className={classes.barColor}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Rent&#38;Go
                    </Typography>
                    <NavLink className={classes.navLink} to="/" exact={true}>Home</NavLink>
                    <NavLink className={classes.navLink} to="/passengers">Para passageiros</NavLink>
                    <NavLink className={classes.navLink} to="/drivers">Para motoristas</NavLink>
                    <NavLink className={classes.navLink} to="/signin">Entrar</NavLink>
                    <Button className={classes.signButton} color="inherit" onClick={handleMenu}>Cadastre-se</Button>
                    <Menu id="app-menu" anchorEl={anchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right'}} keepMounted transformOrigin={{vertical: 'top', horizontal: 'right'}} open={open} onClose={handleClose}>
                        <MenuItem>Cadastre-se para viajar</MenuItem>
                        <MenuItem>Cadastre-se para dirigir</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        </div>
    )
}