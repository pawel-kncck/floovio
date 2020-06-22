import React, { Fragment,useContext, useEffect, useState } from 'react';
import { Button, Typography, TextField, Paper, Fab, Dialog, DialogContent, DialogActions, DialogTitle, Box } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import UserContext from '../../Context/UserContext';
import { connect } from 'react-redux';
import { setTitle, setAuthor, addUser, addExercise, updateExercise } from '../../Store/newLessonActions';
import Editor from '../Builder/Editor/Editor';
import Renderer from '../../Utilities/Renderer';
import OutputParser from '../../Utilities/OutputParser';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import firebase from '../../firebase';
import { useHistory } from 'react-router-dom';

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
})

const CreateNewLesson = (props) => {
    const classes = useStyles();
    const authUser = useContext(UserContext);
    const history = useHistory();
    const [outputParsed, setParsedOutput] = useState("");
    const [rawHtml,setRawHtml] = useState("");
    const [open,setOpen] = useState(false);
    const [isInvalid,setIsInvalid] = useState(false);
    const [isLessonNew,setIsLessonNew] = useState();
    // For adding new exercise activeExercise = -1, for editing existing activeExercise = index
    const [activeExercise,setActiveExercise] = useState(-1);
    const [initialEditorContent,setInitialEditorContent] = useState("");
    
    const userEmail = (authUser !== null) ? authUser.email : ''

    const handleOpenEditorInCreateMode = () => {
        setOpen(true);
        setInitialEditorContent("");
        setActiveExercise(-1);
    }

    const handleEditorChange = (editorOutput) => {
        setParsedOutput(OutputParser(editorOutput));
        setRawHtml(editorOutput);
    }

    const handleOpenEditorInEditMode = (index) => {
        setOpen(true);
        setInitialEditorContent(props.htmlStrings[index].__html);
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

    const saveHandler = () => {
        const db = firebase.firestore();
        db.collection("courses").doc('M4iGPRQosf50ZM8BlB8t').collection('lessons').add(props.activeLesson)
            .then((res) => {
                // props.closeBuilder();
                // props.cleanExerciseState();
                // history.push()
                console.log(res);
            })
            .catch((err) => {
                console.error(err);
            })
    }

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const db = firebase.firestore();
    //         const data = await (await db.doc(`/lessons/${props.match.params.lessonId}`).get()).data();
    //         setData({...data, lessonId: props.match.params.lessonId});
    //         props.setActiveLessonData({ ...data, lessonId: props.match.params.lessonId });
    //         authListener();
    //     };
    //     fetchData();
    // }, [props.match.params.lessonId]);

    useEffect(() => {
        if (props.match.path === "/lesson/new") {
            props.setAuthor(userEmail);
            if (authUser) {
                props.addUser(authUser.uid)
            }
            setIsLessonNew(true);
        } else {
            const msg = `Edit mode for id: ${props.match.params.id}`;
            console.log(msg);
            setIsLessonNew(false);
        }
    }, [userEmail])

    return (
        <Fragment>
            <Box className={classes.h1title}>
                <Typography variant="h1">{(isLessonNew) ? 'Create new lesson' : 'Update lesson'}</Typography>
            </Box>
            <Box className={classes.header}>
                <TextField className={classes.title} variant="outlined" id="title" label="Title" placeholder="Enter title of the lesson" helperText={`Author: ${userEmail}`} fullWidth value={props.title} onChange={(e) => props.setTitle(e.target.value)} />
                <Box className={classes.boxForButton}>
                    <Button size="large" disabled={isInvalid} variant="contained" color="primary" className={classes.saveButton} onClick={saveHandler}>Save</Button>
                </Box>
            </Box>
            
            {/* {(outputParsed) ? <Paper elevation={3} className={classes.exrcContainer}>{Renderer(outputParsed)}</Paper> : null} */}

            {props.exercises.map((el,index) => {
                return (
                    <Paper key={index} elevation={3} className={classes.exrcContainer}>
                        <div className={classes.exrcContent}>{Renderer(el)}</div>
                        <div>
                            <Button color="primary"><ArrowUpwardIcon /></Button>
                            <Button color="primary"><ArrowDownwardIcon /></Button>
                            <Button color="primary" onClick={() => handleOpenEditorInEditMode(index)}><EditIcon /></Button>
                            <Button color="primary"><DeleteIcon /></Button>
                        </div>
                    </Paper>
                )
            })}

            <Paper elevation={1} className={classes.exrcContainer}>
                <Fab variant="extended" size="medium" color="primary" onClick={handleOpenEditorInCreateMode}>
                    <AddIcon />
                    Add new exercise
                </Fab>
            </Paper>
            <Dialog open={open}>
                <DialogTitle>
                    Create new exercise
                </DialogTitle>
                <DialogContent>
                    <Editor transformOutput={(content) => handleEditorChange(content)} initialContent={initialEditorContent} />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleEditorCancel} color="primary">
                        Cancel
                    </Button>
                    {(activeExercise === -1) 
                    ?   <Button autoFocus onClick={handleEditorAddNewExercise} color="primary" variant="contained">
                            Add new
                        </Button>
                    :   <Button autoFocus onClick={handleEditorUpdateExercise} color="primary" variant="contained">
                            Save changes
                        </Button>}
                </DialogActions>
            </Dialog>
            {/* <pre>{JSON.stringify(outputParsed, null, 4)}</pre> */}
            <pre>{JSON.stringify(props.activeLesson, null, 4)}</pre>

        </Fragment>
    );
}

const mapStateToProps = state => {
    return {
        activeLesson: state.newLessonReducer,
        title: state.newLessonReducer.title,
        exercises: state.newLessonReducer.json.child,
        htmlStrings: state.newLessonReducer.htmlStrings,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setTitle: (title) => {dispatch(setTitle(title))},
        setAuthor: (author) => {dispatch(setAuthor(author))},
        addUser: (userUid) => {dispatch(addUser(userUid))},
        addExercise: (json,html) => {dispatch(addExercise(json,html))},
        updateExercise: (json,html,index) => {dispatch(updateExercise(json,html,index))},
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateNewLesson);