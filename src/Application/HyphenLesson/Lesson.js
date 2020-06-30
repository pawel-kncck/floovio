import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles, Paper, CircularProgress, Box, Typography, Button, MenuItem, InputLabel, FormControl, Select, Fab, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core';

import { fetchLesson, setMode, setTitle, setLessonDate, setAuthor, addExercise, updateExercise, deleteExercise, killSpinner } from '../../Store/lesson.actions';
import { mapPathToMode, convertEpoch, convertDateStringToEpoch } from './helpers';
import renderer from '../../Utilities/Renderer';
// import HTextField from '../Lesson/PassiveTextField'
// import HDropDown from '../Lesson/PassiveDropDown'
// import HRadioGroup from '../Lesson/PassiveRadio'
import { updateAnswers, updateLesson } from '../../Database/db.lesson';
import { useHistory } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import AddIcon from '@material-ui/icons/Add';
import Editor from '../Builder/Editor/Editor';
import OutputParser from '../../Utilities/OutputParser';
import firebase from '../../firebase';
import ReactAudioPlayer from 'react-audio-player';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import NotesIcon from '@material-ui/icons/Notes';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExerciseIcon from '@material-ui/icons/TocOutlined';
import VideoIcon from '@material-ui/icons/OndemandVideoOutlined';
import TextIcon from '@material-ui/icons/TextFieldsOutlined';
import ImageIcon from '@material-ui/icons/ImageOutlined';


const useStyles = makeStyles({
    root: {
        margin: '10px'
    },
    crossBarWithTitle: {
        width: '100%',
        backgroundColor: 'rgb(3, 37, 140)'
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
        height: '40px',
        flexGrow: '1'
    },
    exrcContainer: {
        padding: '10px',
        display: 'flex',
        justifyContent: 'center'
    },
    exrcContainerEdit: {
        padding: '10px',
        display: 'flex',
        justifyContent: 'center',
        border: '1px dashed #ccc',
        margin: '10px',  
    },
    exrcContent: {
        flexGrow: '1',
        marginLeft: '20px'
    },
    editButtons: {
        display: 'flex',
        flexDirection: 'column'
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
    },
    emptyState: {
        width: '100%',
        height: '200px',
        border: '2px dashed #ddd',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    datepicker: {
        margin: '10px'
    }
});

const actions = [
    { icon: <ExerciseIcon />, name: 'Exercise' },
    { icon: <TextIcon />, name: 'Text' },
    { icon: <ImageIcon />, name: 'Image' },
    { icon: <VideoIcon />, name: 'Video' },
    // { icon: <FavoriteIcon />, name: 'Like' },
];

const Lesson = (props) => {
    const classes = useStyles();
    const mode = mapPathToMode(props.match.path);
    const lessonIdFromPath = props.match.params.lessonId || null;
    const courseIdFromPath = props.match.params.courseId || null;
    const history = useHistory();
    const [outputParsed, setParsedOutput] = useState("");
    const [rawHtml,setRawHtml] = useState("");
    const [open,setOpen] = useState(false);
    // const [isInvalid,setIsInvalid] = useState(false);
    const [isLessonNew,setIsLessonNew] = useState();
    // For adding new exercise activeExercise = -1, for editing existing activeExercise = index
    const [activeExercise,setActiveExercise] = useState(-1);
    const [initialEditorContent,setInitialEditorContent] = useState("");

    useEffect(() => {
        if (mode !== 'new') {
            props.fetchLesson(mode,courseIdFromPath,lessonIdFromPath);
        } else {
            props.killSpinner()
        }
        props.setMode(mode);
    }, [props.fetchLesson,mode,courseIdFromPath,lessonIdFromPath])

    const modeSwitchHandler = (e) => {
        props.setMode(e.target.value)
    }

    const isInvalid = (props.exercises.length === 0)

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
            },
        },
    };

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

    const saveHandler = () => {
        if (props.mode === ('solve' || 'check')) {
            updateAnswers(courseIdFromPath,lessonIdFromPath,props.userInput)
        } else if (props.mode === 'edit') {
            updateLesson(courseIdFromPath,lessonIdFromPath,props.data)
        } else if (props.mode === 'new') {
            const db = firebase.firestore();
            db.collection("courses").doc(courseIdFromPath).collection('lessons').add({
                ...props.data,
                date: Date.now()
            })
                .then((response) => {
                    // console.log("Response: ", response)
                    history.push(`/course/${courseIdFromPath}/lesson/edit/${response.id}`)
                })
                .catch((err) => {
                    console.log(err)
                })
            props.setMode('edit')

        }
    }

    console.log(convertEpoch(props.data.lessonDate))
   
    return (
        <Fragment>
            <Box className={classes.header}>
                {(props.mode === 'edit' || props.mode === 'new')
                    ?   <Fragment>
                            <TextField className={classes.title} variant="outlined" id="title" label="Title" placeholder="Enter title of the lesson" fullWidth value={props.title} onChange={(e) => props.setTitle(e.target.value)} />
                            <form className={classes.datepicker} noValidate>
                                <TextField
                                    id="date"
                                    label="Lesson date"
                                    type="date"
                                    defaultValue={convertEpoch(props.data.lessonDate).substr(0,10)}
                                    onChange={(e) => props.setLessonDate(convertDateStringToEpoch(e.target.value))}
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </form>
                        </Fragment>
                    :   <Typography variant="h1" className={classes.title}>{props.data.title}</Typography>
                }

                <Box className={classes.boxForButton}>
                    <Button size="large" variant="contained" disabled={isInvalid} color="primary" className={classes.saveButton} onClick={saveHandler}>Save</Button>
                </Box>
            </Box>
            {(props.mode !== 'new')
                ? <FormControl className={classes.formControl}>
                    <InputLabel id="demo-mutiple-name-label">Mode</InputLabel>
                    <Select
                        labelId="mode-selector-label"
                        id="mode-selector"
                        style={{ minWidth: '150px' }}
                        defaultValue={mode}
                        value={props.mode}
                        onChange={modeSwitchHandler}
                        MenuProps={MenuProps}
                    >
                        <MenuItem key='10' value='solve'>Student</MenuItem>
                        <MenuItem key='20' value='check'>Teacher</MenuItem>
                        <MenuItem key='30' value='edit'>Editor</MenuItem>
                    </Select>
                </FormControl>
                : null
            }
            {(props.isFetching) ? <div className={classes.spinner}><CircularProgress disableShrink /></div> : null}

            {props.data.json.child.map((el,index) => {
            return (
                    <Paper key={index} elevation={0} className={(props.mode === 'edit') ? classes.exrcContainerEdit : classes.exrcContainer}>
                        <div className={classes.exrcContent}>
                            {renderer(el)}
                        </div>
                        {(props.mode === 'edit' || props.mode === 'new') 
                            ?   <div className={classes.editButtons}>
                                    <Button color="primary"><ArrowUpwardIcon /></Button>
                                    <Button color="primary"><ArrowDownwardIcon /></Button>
                                    <Button color="primary" onClick={() => handleOpenEditorInEditMode(index)}><EditIcon /></Button>
                                    <Button color="primary" onClick={() => props.deleteExercise(index)}><DeleteIcon /></Button>
                                </div>
                            :   null
                        }
                    </Paper>
                )
            })}

            {(props.exercises.length === 0) 
                ?   <Box className={classes.emptyState}>
                        <Typography variant='h1'>Start building a new lesson!</Typography><br></br>
                        <Typography variant='h6'>Click on the button below to add a first exercise</Typography>
                    </Box>
                : null
            }

            {/* {(props.mode === 'edit' || props.mode === 'new')
                ?   <Paper elevation={0} className={classes.exrcContainer}>
                        <Fab variant="extended" size="medium" color="primary" onClick={handleOpenEditorInCreateMode}>
                            <AddIcon />
                            Add new exercise
                        </Fab>
                    </Paper>
                : null
            } */}

            {(props.mode === 'edit' || props.mode === 'new')
                ?   <SpeedDial
                        ariaLabel="SpeedDial example"
                        // className={classes.speedDial}
                        icon={<SpeedDialIcon />}
                        // onClose={handleClose}
                        // onOpen={handleOpen}
                        open
                        direction='right'
                    >
                        {actions.map((action) => (
                            <SpeedDialAction
                                key={action.name}
                                icon={action.icon}
                                tooltipTitle={action.name}
                                onClick={handleOpenEditorInCreateMode}
                            />
                        ))}
                    </SpeedDial>
                : null
            }
            

            
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

            {/* <pre>{JSON.stringify(props.userInput, null, "\t")}</pre> */}
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
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Lesson);