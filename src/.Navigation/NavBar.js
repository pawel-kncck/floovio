import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import MoreMenu from './MoreMenu';
import { NavLink } from 'react-router-dom';
import * as routes from '../.Application/routes';
import { connect } from 'react-redux';
import { logout } from '../.Store/auth.actions';
import { makeStyles } from '@material-ui/core';

// .navbar {
//     position: sticky;
//     height: 48px;
//     font-size: 15px;
//     top: 0;
//     z-index: 120;
//     background-color: var(--main-component-color);
//     color: #f5f5f5;
//     width: 100%;
//     display: flex;
//     align-items: center;
//     box-shadow: 0 2px 2px #9e9e9e;
//   }
  
//   .navbar-menu.left {
//     flex-grow: 1;
//     display: flex;
//     align-items: center;
//   }
  
//   .navbar-menu.right {
//     display: flex;
//     align-items: center;
//   }
  
//   .navbar-menu.right li {
//     display: flex;
//     align-items: center;
//   }
  
//   .navbar-icon {
//     margin: 0 10px;
//   }
  
//   .navbar-brand {
//     margin: 0 10px;
//     font-size: 1.2em;
//   }
  
//   .navbar-menu ul {
//     border: 1px solid red;
//   }
  
//   .navbar-menu li {
//     list-style: none;
//     display: inline;
//     margin: 0 20px;
//     cursor: pointer;
//   }
  
//   .navbar-menu li a {
//     text-decoration: none;
//     color: inherit;
//     transition: color 0.2s;
//   }

const useStyles = makeStyles(theme => ({
    root: {
        position: 'sticky',
        height: '48px',
        fontSize: '15px',
        top: 0,
        zIndex: 120,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.offWhite,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        boxShadow: theme.shadows[3],
    },
    navIcon: {
        margin: '0 10px',
    },
    navbarBrand: {
        margin: '0 10px',
        fontSize: '1.2rem',
    },
    navbarMenu: {
        display: 'flex',
        alignItems: 'center',
        '& li': {
            listStyle: 'none',
            display: 'inline',
            margin: '0 20px',
            cursor: 'pointer',
            '& a': {
                textDecoration: 'none',
                color: 'inherit',
                transition: 'color 0.2s',
            },
        },
    }
}));

const NavBar = (props) => {
    const classes = useStyles();

    const handleSignOut = () => {
        props.logout();
    }

    return (
        <div className={classes.root}>
            <div className={classes.navIcon}></div>
            {/* <MenuIcon /> */}
            <div className={classes.navbarBrand}>{process.env.REACT_APP_TITLE}</div>
            <ul className={classes.navbarMenu} style={{ flexGrow: 1 }} >
                {(props.user)
                    ?   <li><NavLink to={routes.HOME}>My courses</NavLink></li>
                    :   null
                }
            </ul>
            <ul className={classes.navbarMenu}>
                {(props.user)
                    ?   <li><NavLink to='/login' onClick={handleSignOut}>Log out</NavLink></li>
                    :   <li><NavLink to='/login'>Log in</NavLink></li>
                }
                {(props.user) ? <MoreMenu /> : null}
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