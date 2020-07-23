import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import { NavLink } from 'react-router-dom';
import MoreIcon from '@material-ui/icons/MoreVert';
import * as routes from '../.Application/routes';
import { connect } from 'react-redux';
import { logout } from '../.Store/auth.actions';



const NavBar = (props) => {

    const handleSignOut = () => {
        props.logout();
    }

    return (
        <div className="navbar">
            <div className="navbar-icon"></div>
            <MenuIcon />
            <div className="navbar-brand">Dialecton</div>
            <ul className="navbar-menu left">
                {(props.user)
                    ?   <li><NavLink to={routes.HOME}>My courses</NavLink></li>
                    :   null
                }
            </ul>
            <ul className="navbar-menu right">
                {(props.user)
                    ?   <li><NavLink to='/login' onClick={handleSignOut}>Log out</NavLink></li>
                    :   <li><NavLink to='/login'>Log in</NavLink></li>
                }
            </ul>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        user: state.auth.userUid,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout()),
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(NavBar);