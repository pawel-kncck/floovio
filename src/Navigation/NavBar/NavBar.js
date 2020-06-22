import React, { useContext } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import { NavLink } from 'react-router-dom';
import UserContext from '../../Context/UserContext';
import firebase from '../../firebase';
import { Avatar } from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreVert';
import { connect } from 'react-redux';
import { logout } from '../../Store/auth.actions';



const NavBar = (props) => {
    // const authUser = useContext(UserContext);

    const handleSignOut = () => {
        console.log("Log out clicked!")
        props.logout();
        // firebase.auth().signOut()
        //     .then((u) => {
        //         console.log("User Signed Out!")
        //     })
        //     .catch((err) => {
        //         console.error(err)
        //     })
    }

    return (
        <div className="navbar">
            <div className="navbar-icon"></div>
            <MenuIcon />
            <div className="navbar-brand">Dialecton</div>
            <ul className="navbar-menu left">
                <li><NavLink to='/lessons'>All lessons</NavLink></li>
                <li><NavLink to='/lesson/new'>Create new lesson</NavLink></li>
            </ul>
            <ul className="navbar-menu right">
                <li>User: placeholder</li>
                {/* {authUser ? <li><Avatar alt={authUser.displayName} src={authUser.photoURL} /></li> : null} */}
                <li><MoreIcon /></li>
                <li><NavLink to='/login'>Log in</NavLink></li>
                <li><NavLink to='/logoutpage' onClick={handleSignOut}>Log out</NavLink></li>
                <li><NavLink to='/'>Sign up</NavLink></li>
            </ul>
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout()),
    }
}
 
export default connect(null,mapDispatchToProps)(NavBar);