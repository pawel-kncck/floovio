import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import { NavLink } from 'react-router-dom';
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
                {(props.user)
                    ?   <li><NavLink to='/'>My courses</NavLink></li>
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
        user: state.auth.authUser,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout()),
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(NavBar);