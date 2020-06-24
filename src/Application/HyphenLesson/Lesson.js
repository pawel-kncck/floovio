import React, { Fragment, useContext, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles, Paper, CircularProgress, Box, Typography, Button, FormControlLabel, Switch, MenuItem, InputLabel, FormControl, Select, Input, Fab, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core';

import { fetchLesson, setMode, setTitle, setAuthor, addExercise, updateExercise, deleteExercise } from '../../Store/lesson.actions';
import { mapPathToMode } from './helpers';
import renderer from '../../Utilities/Renderer';
import HTextField from '../Lesson/PassiveTextField'
import HDropDown from '../Lesson/PassiveDropDown'
import HRadioGroup from '../Lesson/PassiveRadio'
import { updateAnswers, updateLesson } from '../../Database/db.lesson';
import { useHistory } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import AddIcon from '@material-ui/icons/Add';
import Editor from '../Builder/Editor/Editor';
import OutputParser from '../../Utilities/OutputParser';


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
    }
});

const Lesson = (props) => {
    const classes = useStyles();
    const mode = mapPathToMode(props.match.path);
    const lessonIdFromPath = props.match.params.lessonId || null;
    const courseIdFromPath = props.match.params.courseId || null;
    const history = useHistory();
    const [outputParsed, setParsedOutput] = useState("");
    const [rawHtml,setRawHtml] = useState("");
    const [open,setOpen] = useState(false);
    const [isInvalid,setIsInvalid] = useState(false);
    const [isLessonNew,setIsLessonNew] = useState();
    // For adding new exercise activeExercise = -1, for editing existing activeExercise = index
    const [activeExercise,setActiveExercise] = useState(-1);
    const [initialEditorContent,setInitialEditorContent] = useState("");

    useEffect(() => {
        props.fetchLesson(mode,courseIdFromPath,lessonIdFromPath);
        props.setMode(mode);
    }, [props.fetchLesson,mode,courseIdFromPath,lessonIdFromPath])

    const componentMap = {
        hyphentextfield: HTextField,
        hyphendropdown: HDropDown,
        hyphenradiogroup: HRadioGroup
    }

    const modeSwitchHandler = (e) => {
        props.setMode(e.target.value)
    }

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
            updateLesson(courseIdFromPath,lessonIdFromPath,props.data.json)
        }
    }
   
    return (
        <Fragment>
            <Box className={classes.header}>
                <Typography variant="h1" className={classes.title}>{props.data.title}</Typography>
                <Box className={classes.boxForButton}>
                    <Button size="large" variant="contained" color="primary" className={classes.saveButton} onClick={saveHandler}>Save</Button>
                </Box>
            </Box>
            <FormControl className={classes.formControl}>
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
            {(props.isFetching) ? <div className={classes.spinner}><CircularProgress disableShrink /></div> : null}

            {props.data.json.child.map((el,index) => {
            return (
                <Paper key={index} elevation={3} className={classes.exrcContainer}>
                    <div className={classes.exrcContent}>
                        {renderer(el)}
                    </div>
                    {(props.mode === 'edit') 
                        ?   <div className={classes.editButtons}>
                                <Button color="primary"><ArrowUpwardIcon /></Button>
                                <Button color="primary"><ArrowDownwardIcon /></Button>
                                <Button color="primary" onClick={() => handleOpenEditorInEditMode(index)}><EditIcon /></Button>
                                <Button color="primary" onClick={() => props.deleteExercise(index)}><DeleteIcon /></Button>
                            </div>
                        :   null
                    }
                </Paper>)
            })}

            {(props.mode === 'edit')
                ?   <Paper elevation={0} className={classes.exrcContainer}>
                        <Fab variant="extended" size="medium" color="primary" onClick={handleOpenEditorInCreateMode}>
                            <AddIcon />
                            Add new exercise
                        </Fab>
                    </Paper>
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
        setAuthor: (author) => {dispatch(setAuthor(author))},
        addExercise: (json,html) => {dispatch(addExercise(json,html))},
        updateExercise: (json,html,index) => {dispatch(updateExercise(json,html,index))},
        deleteExercise: (index) => {dispatch(deleteExercise(index))},
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Lesson);