import React from 'react';
import { Route, Switch } from 'react-router-dom'
import * as routes from './routes';
import { makeStyles } from '@material-ui/core';
import LessonList from '../.Lesson/LessonList/LessonList';
import Lesson from '../.Lesson/Lesson';
import Notes from '../.Notes/Notes';

const useStyles = makeStyles({
    main: {
        display: 'grid',
        zIndex: 100,
        gridTemplateColumns: '26.8px 1fr 26.8px',
        width: '100%',
        gridGap: '30px',
        position: 'fixed',
        backgroundColor: '#eee',
        height: '100%',
        overflowX: 'hidden',
        overflowY: 'auto',
    },
    aside: {
        display: 'flex',
        backgroundColor: '#fff',
        flexDirection: "column",
        zIndex: 110,
        height: '100%',
        boxShadow: '1px 3px 3px #ccc'
    },
    article: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff',
        margin: '40px 0',
        boxShadow: '0 1px 2px 0 rgba(60,64,67,.3)',
        padding: '40px',
        maxWidth: '969px',
        height: '100vh',
        overflowY: 'auto',
    },
    notes: {
        zIndex: 110,
        backgroundColor: '#fff',
    }
})

const Workspace = (props) => {
    const classes = useStyles();
    
    return (
        <main className={classes.main}>

            <aside className={classes.aside}>
                {/* <Route path="/course/:id" component={LessonList} /> */}
                <Route path="/course/:id" component={LessonList} />
            </aside>

            <article className={classes.article}>
                <Switch>
                    <Route path={routes.LESSON_NEW} exact component={Lesson} />
                    <Route path={routes.LESSON_EDIT} exact component={Lesson} />
                    <Route path={routes.LESSON_SOLVE} exact component={Lesson} />
                    <Route path={routes.LESSON_CHECK} exact component={Lesson} />
                </Switch>
            </article>

            <div className={classes.notes}>
                {/* <Route path="/course/:id" component={Notes} /> */}
            </div>
            
        </main>
    );
}
 
export default Workspace;