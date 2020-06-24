import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { makeStyles, Paper, CircularProgress } from '@material-ui/core';
import { fetchLesson, setMode } from '../../Store/lesson.actions';
import { mapPathToMode } from './helpers';
import renderer from '../../Utilities/Renderer';
import TextField from '../Lesson/PassiveTextField'
import DropDown from '../Lesson/PassiveDropDown'
import RadioGroup from '../Lesson/PassiveRadio'

const useStyles = makeStyles({
    root: {
        margin: '10px'
    },
    h1title: {
        marginTop: '20px'
    },
    header: {
        margin: '20px 0',
        display: 'flex'
    },
    title: {
        marginRight: '20px',
        flexGrow: '1'
    },
    exrcContainer: {
        padding: '10px',
        display: 'flex',
        marginTop: '20px'
    },
    exrcContent: {
        flexGrow: '1',
        marginLeft: '20px'
    },
    boxForButton: {
        width: '150px'
    },
    saveButton: {
        height: '55px',
        width: '100%'
    },
    spinner: {
        margin: '20px 0',
        textAlign: 'center'
    }
});

const Lesson = (props) => {
    const classes = useStyles();
    const mode = mapPathToMode(props.match.path);
    const lessonIdFromPath = props.match.params.lessonId || null;
    const courseIdFromPath = props.match.params.courseId || null;

    useEffect(() => {
        props.fetchLesson(mode,courseIdFromPath,lessonIdFromPath);
        props.setMode(mode);
    }, [props.fetchLesson,mode,courseIdFromPath,lessonIdFromPath])

    const componentMap = {
        hyphentextfield: TextField,
        hyphendropdown: DropDown,
        hyphenradiogroup: RadioGroup
    }
   
    return (
        <Fragment>
            <h1>Hyphen Lesson Component loaded in {mode} mode.</h1>
            {(props.isFetching) ? <div className={classes.spinner}><CircularProgress disableShrink /></div> : null}

            {props.data.json.child.map((el,index) => {
            return (
                <Paper key={index} elevation={3} className={classes.exrcContainer}>
                    <div className={classes.exrcContent}>
                        {renderer(el)}
                    </div>
                </Paper>)
            })}

            <pre>{JSON.stringify(props.userInput, null, "\t")}</pre>
        </Fragment>
    );
}

const mapStateToProps = state => {
    return {
        data: state.lesson.lessonData,
        userInput: state.lesson.userInput,
        isFetching: state.lesson.isFetching
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchLesson: (mode, lessonId, courseId) => {dispatch(fetchLesson(mode, lessonId, courseId))},
        setMode: (path) => {dispatch(setMode(path))},
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Lesson);