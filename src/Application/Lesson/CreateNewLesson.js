import React, { Fragment,useContext, useEffect, useState } from 'react';
import { Typography, TextField, Paper, Button, Fab, Dialog, DialogContent, DialogActions, DialogTitle } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import UserContext from '../../Context/UserContext';
import { connect } from 'react-redux';
import { setTitle, setAuthor, addUser, addExercise } from '../../Store/newLessonActions';
import Editor from '../Builder/Editor/Editor';
import Renderer from '../../Utilities/Renderer';
import OutputParser from '../../Utilities/OutputParser';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
    root: {
        margin: '10px'
    },
    title: {
        margin: '20px'
    },
    exrcContainer: {
        padding: '10px',
        display: 'flex',
        marginTop: '20px'
    },
    exrcContent: {
        flexGrow: '1'
    },
    saveButton: {
        margin: '10px'
    },

})
const CreateNewLesson = (props) => {
    const classes = useStyles();
    const authUser = useContext(UserContext);
    const [outputParsed, setParsedOutput] = useState("");
    const [open,setOpen] = useState(false);
    
    const userEmail = (authUser !== null) ? authUser.email : ''

    const handleOpen = () => {
        setOpen(true);
    }

    const handleEditorCancel = () => {
        setOpen(false);
    }
    
    const handleEditorSave = () => {
        props.addExercise(outputParsed);
        setOpen(false);
    }


    useEffect(() => {
        props.setAuthor(userEmail);
        if (authUser) {
            props.addUser(authUser.uid)
        }
    }, [userEmail])

    return (
        <Fragment>
            <Typography variant="h4" className={classes.title}>Create new lesson</Typography>
            <TextField variant="outlined" id="title" label="Title" placeholder="Enter title of the lesson" helperText={`Author: ${userEmail}`} fullWidth value={props.title} onChange={(e) => props.setTitle(e.target.value)} />
            <Button variant="contained" color="primary" className={classes.saveButton}>Save</Button>
            {/* {(outputParsed) ? <Paper elevation={3} className={classes.exrcContainer}>{Renderer(outputParsed)}</Paper> : null} */}
            {props.exercises.map((el,index) => {
                return (
                    <Paper key={index} elevation={3} className={classes.exrcContainer}>
                        <div className={classes.exrcContent}>{Renderer(el)}</div>
                        <div>
                            <Button color="primary"><EditIcon /></Button>
                            <Button color="primary"><DeleteIcon /></Button>
                        </div>
                    </Paper>
                )
            })}

            <Paper elevation={1} className={classes.exrcContainer}>
                <Fab variant="extended" size="medium" color="primary" onClick={handleOpen}>
                    <AddIcon />
                    Add new exercise
                </Fab>
            </Paper>
            <Dialog open={open}>
                <DialogTitle>
                    Create new exercise
                </DialogTitle>
                <DialogContent>
                    <Editor transformOutput={(content) => setParsedOutput(OutputParser(content))} initialContent="Test A" />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleEditorCancel} color="primary">
                        Cancel
                    </Button>
                    <Button autoFocus onClick={handleEditorSave} color="primary" variant="contained">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
            <pre>{JSON.stringify(outputParsed, null, 4)}</pre>
            <pre>{JSON.stringify(props.activeLesson, null, 4)}</pre>

        </Fragment>
    );
}

const mapStateToProps = state => {
    return {
        activeLesson: state.newLessonReducer,
        title: state.newLessonReducer.title,
        exercises: state.newLessonReducer.json.child,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setTitle: (title) => {dispatch(setTitle(title))},
        setAuthor: (author) => {dispatch(setAuthor(author))},
        addUser: (userUid) => {dispatch(addUser(userUid))},
        addExercise: (json) => {dispatch(addExercise(json))},
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(CreateNewLesson);