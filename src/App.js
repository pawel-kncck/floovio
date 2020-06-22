import React, { useState, useEffect } from 'react';
import './App.css';
import NavBar from './Navigation/NavBar/NavBar';
import Application from './Application/Application'
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import UserContext from './Context/UserContext';
import firebase from './firebase';
import { connect } from 'react-redux';
import { setUser } from './Store/auth.actions';

function App(props) {
  // const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    firebase.auth()
    .onAuthStateChanged(user => {
      props.setUser(user)
    })
  }, []);

  return (
    // <UserContext.Provider value={authUser}>
      <BrowserRouter>
      <CssBaseline />
          <div className="app">
            <NavBar />
            <Application />

          </div>
      </BrowserRouter>
    // </UserContext.Provider>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    setUser: (user, id, email) => dispatch(setUser(user,id,email)),
  }
}


export default connect(null,mapDispatchToProps)(App);
