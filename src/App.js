import React from 'react';
import './App.css';
import NavBar from './Navigation/NavBar/NavBar';
import Application from './Application/Application'
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

function App() {
  return (
    <BrowserRouter>
    <CssBaseline />
      <div className="app">
        <NavBar />
        <Application />
      </div>
    </BrowserRouter>
  );
}

export default App;
