import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom'
import * as routes from './routes';
import { makeStyles } from '@material-ui/core';
import Sidebar from '../.Navigation/Sidebar/Sidebar';
import Lesson from '../.Lesson/Lesson';
import { fetchCourse } from '../.Store/course.actions';
import { connect } from 'react-redux';
import Notes from '../.Notes/Notes';

const useStyles = makeStyles({
    main: {
        display: 'grid',
        zIndex: 100,
        gridTemplateColumns: 'auto 1fr',
        width: '100%',
        gridGap: '30px',
        position: 'fixed',
        backgroundColor: '#eee',
        height: '100%',
        overflowX: 'hidden',
        overflowY: 'hidden',
    },
    aside: {
        display: 'flex',
        backgroundColor: '#fff',
        flexDirection: "column",
        zIndex: 110,
        height: '100%',
        boxShadow: '1px 3px 3px #ccc',
        overflowX: 'hidden',
        overflowY: 'auto',
    },
    article: {
        display: 'flex',
        margin: 'auto',
        flexDirection: 'column',
        backgroundColor: '#eee',
        weight: "100%",
        height: '100vh',
        overflowY: 'auto',
    },
})

const Workspace = (props) => {
    const classes = useStyles();

    useEffect(() => {
        props.fetchCourse(props.match.params.courseId)
    },[props])
    
    return (
        <main className={classes.main}>

            <aside className={classes.aside}>
                <Route path="/course/:id" component={Sidebar} />
            </aside>

            <article className={classes.article}>
                <Switch>
                    <Route path={routes.LESSON_NEW} exact component={Lesson} />
                    <Route path={routes.LESSON_EDIT} exact component={Lesson} />
                    <Route path={routes.LESSON_SOLVE} exact component={Lesson} />
                    <Route path={routes.LESSON_CHECK} exact component={Lesson} />
                    <Route path={routes.NOTES} exact component={Notes} />
                </Switch>
            </article>
            
        </main>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        fetchCourse: (id) => {dispatch(fetchCourse(id))}
    }
}

export default connect(null,mapDispatchToProps)(Workspace);