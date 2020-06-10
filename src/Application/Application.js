import React from 'react';
import Builder from './Builder/Builder';
import List from './List/List';
import Solver from './Solver/Solver';
import Backdrop from '../Components/Backdrop';
import NewParser from '../Lab/NewParser';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import NewSolver from './Solver/NewSolver'
import ConverterTesting from '../Lab/ConverterTesting';

const Application = (props) => {
    return (
        <div className="app-container">
            <Backdrop show={props.showBuilder}>
                <Builder show={props.showBuilder}/>
            </Backdrop>
            <Route path="/" exact component={List} />
            <Route path="/exercises" exact component={List} />
            <Route path="/solve/:exerciseId" component={Solver} />
            <Route path="/lab" component={NewParser} />
            <Route path="/solvelab/:exerciseId" component={NewSolver} />
            <Route path="/convertertesting" component={ConverterTesting} />

        </div>
    );
}

const mapStateToProps = state => {
    return {
        showBuilder: state.showBuilder,
    };
}
 
export default connect(mapStateToProps)(Application);