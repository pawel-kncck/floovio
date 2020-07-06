import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
// import { makeStyles, Paper, CircularProgress, Box, Typography, Button, MenuItem, InputLabel, FormControl, Select, Fab, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core';
import { makeStyles, CircularProgress } from '@material-ui/core';

import { fetchLesson, setMode, setTitle, setLessonDate, setAuthor, addExercise, updateExercise, deleteExercise, killSpinner, addImage, resetLessonData } from '../.Store/lesson.actions';
import { mapPathToMode, convertEpoch, convertDateStringToEpoch } from '../.Utilities/helpers';
import renderer from '../.Utilities/Renderer';
// import HTextField from '../Lesson/PassiveTextField'
// import HDropDown from '../Lesson/PassiveDropDown'
// import HRadioGroup from '../Lesson/PassiveRadio'
import { updateAnswers, updateLesson } from '../Database/db.lesson';
import { useHistory } from 'react-router-dom';
import OutputParser from '../Utilities/OutputParser';
import firebase from '../firebase';

import Header from './Header/LessonHeader';
import ModeSwitch from './ModeSwitch';
import Body from './Body/LessonBody';
import Dialog from './Dialog/SegmentDialog';


// const useStyles = makeStyles({
//     root: {
//         margin: '10px'
//     },
//     crossBarWithTitle: {
//         width: '100%',
//         backgroundColor: 'rgb(3, 37, 140)'
//     },
//     exrcContainer: {
//         padding: '10px',
//         display: 'flex',
//         justifyContent: 'center'
//     },
//     exrcContainerEdit: {
//         padding: '10px',
//         display: 'flex',
//         justifyContent: 'center',
//         border: '1px dashed #ccc',
//         margin: '10px',  
//     },
//     exrcContent: {
//         flexGrow: '1',
//         marginLeft: '20px'
//     },
//     editButtons: {
//         display: 'flex',
//         flexDirection: 'column'
//     },
//     boxForButton: {
//         width: '150px'
//     },
//     spinner: {
//         margin: '20px 0',
//         textAlign: 'center'
//     },
//     emptyState: {
//         width: '100%',
//         height: '200px',
//         border: '2px dashed #ddd',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         flexDirection: 'column'
//     },
// });

const Lesson = (props) => {
    // const classes = useStyles();
    const mode = mapPathToMode(props.match.path);
    const lessonIdFromPath = props.match.params.lessonId || null;
    const courseIdFromPath = props.match.params.courseId || null;
    const history = useHistory();
    const [outputParsed, setParsedOutput] = useState("");
    const [rawHtml,setRawHtml] = useState("");
    const [open,setOpen] = useState(false);
    const [imgDialogOpen,setImgDialogOpen] = useState(false);
    // const [isInvalid,setIsInvalid] = useState(false);
    const [isLessonNew,setIsLessonNew] = useState();
    // For adding new exercise activeExercise = -1, for editing existing activeExercise = index
    const [activeExercise,setActiveExercise] = useState(-1);
    const [initialEditorContent,setInitialEditorContent] = useState("");

    useEffect(() => {
        if (mode !== 'new') {
            props.fetchLesson(mode,courseIdFromPath,lessonIdFromPath);
        } else {
            props.killSpinner();
            props.resetLessonData();
        }
        props.setMode(mode);
    }, [props.fetchLesson,mode,courseIdFromPath,lessonIdFromPath])


    const handleOpenEditorInCreateMode = () => {
        setOpen(true);
        setInitialEditorContent("");
        setActiveExercise(-1);
    }

    const handleAddNew = (actionName) => {
        if (actionName === 'Image') {
            handleOpenImageUploaderInCreateMode();
        } else if (actionName === 'Exercise') {
            handleOpenEditorInCreateMode();
        }
    }

    const handleOpenImageUploaderInCreateMode = () => {
        setImgDialogOpen(true);
        setActiveExercise(-1);
    }

    const handleCancelImageUploader = () => {
        setImgDialogOpen(false);
    }

    const handleAddImage = (url) => {
        setImgDialogOpen(false);
        props.addImage(url);
    }

    const handleEditorChange = (editorOutput) => {
        setParsedOutput(OutputParser(editorOutput));
        setRawHtml(editorOutput);
    }

    const handleOpenEditorInEditMode = (index) => {
        setOpen(true);
        setInitialEditorContent(props.data.htmlStrings[index].__html);
        setActiveExercise(index);
    }

    const handleEditorCancel = () => {
        setOpen(false);
    }
    
    const handleEditorAddNewExercise = () => {
        props.addExercise(outputParsed,rawHtml);
        setOpen(false);
        console.log(rawHtml);
        console.log(typeof rawHtml);
        console.log(outputParsed);
    }

    const handleEditorUpdateExercise = () => {
        props.updateExercise(outputParsed,rawHtml,activeExercise);
        setOpen(false);
    }
   
    return (
        <Fragment>
            {(props.mode === 'new' || props.mode === 'edit') 
                ? <ModeSwitch />
                :   null
            }
            
            {(props.isFetching) 
                ? <CircularProgress disableShrink />
                :   <>
                        <Header />
                        <Body /> 
                    </>
            }

            {(props.open) 
                ? <Dialog />
                :   null
            }
        </Fragment>
    );
}

const mapStateToProps = state => {
    return {
        data: state.lesson.lessonData,
        mode: state.lesson.lessonMode,
        userInput: state.lesson.lessonData.userInput,
        isFetching: state.lesson.isFetching,
        title: state.lesson.lessonData.title,
        exercises: state.lesson.lessonData.json.child,
        htmlStrings: state.lesson.lessonData.htmlStrings,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchLesson: (mode, lessonId, courseId) => {dispatch(fetchLesson(mode, lessonId, courseId))},
        setMode: (path) => {dispatch(setMode(path))},
        setTitle: (title) => {dispatch(setTitle(title))},
        setLessonDate: (epoch) => {dispatch(setLessonDate(epoch))},
        setAuthor: (author) => {dispatch(setAuthor(author))},
        addExercise: (json,html) => {dispatch(addExercise(json,html))},
        updateExercise: (json,html,index) => {dispatch(updateExercise(json,html,index))},
        deleteExercise: (index) => {dispatch(deleteExercise(index))},
        killSpinner: () => {dispatch(killSpinner())},
        addImage: (url) => {dispatch(addImage(url))},
        resetLessonData: () => {dispatch(resetLessonData())}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Lesson);