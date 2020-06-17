import React, { useState, useEffect } from 'react';
import './App.css';
import NavBar from './Navigation/NavBar/NavBar';
import Application from './Application/Application'
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import UserContext from './Context/UserContext';
import firebase from './firebase';

function App() {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    firebase.auth()
    .onAuthStateChanged(user => {
      user ? setAuthUser(user) : setAuthUser(null)
    })
  }, []);

  return (
    <UserContext.Provider value={authUser}>
      <BrowserRouter>
      <CssBaseline />
          <div className="app">
            <NavBar />
            <Application />

          </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
