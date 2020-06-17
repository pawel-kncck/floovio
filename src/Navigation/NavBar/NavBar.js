import React, { useContext } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import { NavLink } from 'react-router-dom';
import UserContext from '../../Context/UserContext';
import firebase from '../../firebase';


const NavBar = () => {
    const authUser = useContext(UserContext);

    const handleSignOut = () => {
        console.log("Log out clicked!")
        firebase.auth().signOut()
            .then((u) => {
                console.log("User Signed Out!")
            })
            .catch((err) => {
                console.error(err)
            })
    }

    return (
        <div className="navbar">
            <div className="navbar-icon"></div>
            <MenuIcon />
            <div className="navbar-brand">Dialetton</div>
            <ul className="navbar-menu left">
                <li><NavLink to='/lessons'>All lessons</NavLink></li>
                <li><NavLink to='/lesson/new'>Create new lesson</NavLink></li>
            </ul>
            <ul className="navbar-menu right">
                {authUser ? <li>User: {authUser.email}</li> : null}
                {!authUser ? <li><NavLink to='/login'>Log in</NavLink></li> : null}
                {authUser ? <li><NavLink to='/logoutpage' onClick={handleSignOut}>Log out</NavLink></li> : null}
                {!authUser ? <li><NavLink to='/'>Sign up</NavLink></li> : null}
            </ul>
        </div>
    );
}
 
export default NavBar;