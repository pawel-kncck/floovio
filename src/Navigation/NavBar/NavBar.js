import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import { NavLink } from 'react-router-dom';


const NavBar = () => {
    return (
        <div className="navbar">
            <div className="navbar-icon"></div>
            <MenuIcon />
            <div className="navbar-brand">Dialetton</div>
            <ul className="navbar-menu left">
                <li><NavLink to='/'>Find exercise</NavLink></li>
                <li><NavLink to='/'>Create exercise</NavLink></li>
            </ul>
            <ul className="navbar-menu right">
                <li><NavLink to='/'>Log in</NavLink></li>
                <li><NavLink to='/'>Log out</NavLink></li>
                <li><NavLink to='/'>Sign up</NavLink></li>
            </ul>
        </div>
    );
}
 
export default NavBar;