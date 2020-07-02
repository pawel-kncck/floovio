import React from 'react';
import { makeStyles } from '@material-ui/core';
import Breadcrumbs from './Breadcrumbs';
import Title from './LessonTitle';
import Date from './LessonDate';

const useStyles = makeStyles({
    root: {
        padding: '10px',
        display: 'flex',

    },
    leftPanel: {
        padding: '10px',
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
    },
    rightPanel: {
        padding: '10px',
        display: 'flex',
        flexDirection: 'column'
    },
    breadcrumbs: {
        padding: '5px'
    },
    title: {
        padding: '5px'
    },
    dateField: {
        padding: '5px'
    },
    actionButton: {
        padding: '5px'
    }
})

const LessonHeader = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.leftPanel}>
                <div className={classes.breadcrumbs}>
                    <Breadcrumbs courseName="Placeholder course name" lessonName="Placeholder lesson name" />
                </div>
                <div className={classes.title}>
                    <Title />
                </div>
            </div>
            <div className={classes.rightPanel}>
                <div>
                    <Date />
                </div>
                <div>
                    
                </div>
            </div>
        </div>
    );
}
 
export default LessonHeader;