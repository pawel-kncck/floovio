import React from 'react';
import Builder from './Builder/Builder';
import List from './List/List';
import Solver from './Solver/Solver';
import Backdrop from '../Components/Backdrop';
import NewParser from '../Lab/NewParser';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import NewSolver from './Solver/NewSolver'
import LoadLessons from './Lesson/LoadLesson';
import Lesson from './Lesson/Lesson';
import LessonList from './Lesson/LessonList';
import ImageUpload from './ImageUpload/ImageUpload';
import LoginPage from './Authentication/LoginPage';
import LogoutDestinationPage from './Authentication/LogoutDestinationPage';
import CreateNewLesson from './Lesson/CreateNewLesson';
import TestCreateElement from '../Lab/testCreateElement';
import Timer from '../Lab/TimerTest';
import Courses from '../Application/Courses/CoursesLanding';
import * as routes from '../routes';
import HyphenLesson from './HyphenLesson/Lesson';

const Application = (props) => {
    return (
        <div className="app-container">
            <div className="lesson-viewer">
                <aside>
                    <Route path="/course/:id" component={LessonList} />
                </aside>
                <main>
                    <Switch>
                        <Route path={routes.LESSON_CREATE_NEW} exact component={CreateNewLesson} />
                        <Route path={routes.LESSON_EDIT} exact component={CreateNewLesson} />
                        <Route path={routes.LESSON_SOLVE} exact component={props => <HyphenLesson {...props} />} />
                        <Route path={routes.LESSON_CHECK} exact component={HyphenLesson} />
                        <Route path={routes.LESSON_DEV} exact component={HyphenLesson} />
                    </Switch>
                </main>
            </div>
            
            


            <Backdrop show={props.showBuilder}>
                <Builder show={props.showBuilder}/>
            </Backdrop>
            <Switch>
                <Route path="/" exact component={Courses} />
            </Switch>
            
            

            <Route path="/exercises" exact component={List} />
            <Route path="/solve/:exerciseId" component={Solver} />
            <Route path="/lab" component={Timer} />
            <Route path="/solvelab/:exerciseId" component={NewSolver} />
            <Route path="/loadlessons" component={LoadLessons} />
            
            
            
            <Route path="/lessons" component={LessonList} />
            <Route path="/images" component={ImageUpload} />
            <Route path="/login" component={LoginPage} />
            <Route path="/logoutpage" component={LogoutDestinationPage} />
            <Route path="/test" component={TestCreateElement} />
        </div>
    );
}

const mapStateToProps = state => {
    return {
        showBuilder: state.showBuilder,
        authUser: state.auth.authUser,
    };
}
 
export default connect(mapStateToProps)(Application);