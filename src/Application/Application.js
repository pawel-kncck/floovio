import React from 'react';
import Builder from './Builder/Builder';
import List from './List/List';
import Solver from './Solver/Solver';
import Backdrop from '../Components/Backdrop';
import NewParser from '../Lab/NewParser';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import NewSolver from './Solver/NewSolver'
import LoadLessons from './Lesson/LoadLesson';
import Lesson from './Lesson/Lesson';
import LessonList from './Lesson/LessonList';
import ImageUpload from './ImageUpload/ImageUpload';
import LoginPage from './Authentication/LoginPage';
import LogoutDestinationPage from './Authentication/LogoutDestinationPage';
import CreateNewLesson from './Lesson/CreateNewLesson';

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
            <Route path="/loadlessons" component={LoadLessons} />
            <Route path="/lesson/new" exact component={CreateNewLesson} />
            {/* <Route path="/lesson/:lessonId" exact component={Lesson} /> */}
            <Route path="/lessons" component={LessonList} />
            <Route path="/images" component={ImageUpload} />
            <Route path="/login" component={LoginPage} />
            <Route path="/logoutpage" component={LogoutDestinationPage} />
        </div>
    );
}

const mapStateToProps = state => {
    return {
        showBuilder: state.showBuilder,
    };
}
 
export default connect(mapStateToProps)(Application);