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
import Courses from '../Application/Courses/CoursesLanding';
import * as routes from '../routes';
import HyphenLesson from './HyphenLesson/Lesson';
import { makeStyles } from '@material-ui/core';
import AudioPlayer from '../Lab/AudioPlayer';
import Notes from '../Application/Notes/Notes';

const useStyles = makeStyles({
    aside: {
        display: 'flex',
        backgroundColor: '#fff',
        flexDirection: "column",
        zIndex: 110,
        height: '100%',
        boxShadow: '1px 3px 3px #ccc'
    },
    main: {
        display: 'grid',
        zIndex: 100,
        gridTemplateColumns: '268px 1fr 268px',
        width: '100%',
        gridGap: '30px',
        position: 'fixed',
        backgroundColor: '#eee',
        height: '100%',
        overflowX: 'hidden',
        overflowY: 'auto',
    },
    article: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff',
        margin: '40px 0',
        boxShadow: '0 1px 2px 0 rgba(60,64,67,.3)',
        padding: '40px',
        maxWidth: '969px',
    },
    dummyColumn: {
        zIndex: -100,
    },
    notes: {
        zIndex: '120px',
        backgroundColor: '#fff',
    }
})

const Application = (props) => {
    const classes = useStyles();

    return (
        <div className="app-container">
            <div className="lesson-viewer">
                <aside className={classes.aside}>
                    <Route path="/course/:id" component={LessonList} />
                </aside>
                <main className={classes.main}>
                    <div className={classes.dummyColumn}></div>
                    <article className={classes.article}>
                        <Switch>
                            <Route path="/" exact component={Courses} />
                            <Route path={routes.LESSON_CREATE_NEW} exact component={CreateNewLesson} />
                            <Route path={routes.LESSON_NEW} exact component={HyphenLesson} />
                            <Route path={routes.LESSON_EDIT} exact component={HyphenLesson} />
                            <Route path={routes.LESSON_SOLVE} exact component={HyphenLesson} />
                            <Route path={routes.LESSON_CHECK} exact component={HyphenLesson} />
                            <Route path={routes.LESSON_DEV} exact component={HyphenLesson} />
                        </Switch>
                    </article>
                    <div className={classes.notes}>
                        <Route path="/course/:id" component={Notes} />
                    </div>
                    Dialecton
                </main>
            </div>
            
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