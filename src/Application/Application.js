import React from 'react';
import Builder from './Builder/Builder';
import List from './List/List';
import Solver from './Solver/Solver';

const Application = () => {
    return (
        <div className="app-container">
            <Builder />
            <List />    
            <Solver />
        </div>
    );
}
 
export default Application;