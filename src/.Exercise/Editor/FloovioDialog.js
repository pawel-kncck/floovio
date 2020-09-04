import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, makeStyles, TextField } from '@material-ui/core';
import Editor from './Editor';
import { connect } from 'react-redux';
import MediaListDialog from '../../.Lesson/Dialog/Editor/MediaListDialog';
import { cancelFloovio, updateName } from '../../.Store/floovio.actions'
import { saveNewExercise, createNewExerciseItem } from '../../.Lists/BackendFunctions'


const useStyles = makeStyles({
    root: {
        zIndex: 200,
    },
    actions: {
        display: "flex",
    },
    leftControls: {
        flexGrow: 1
    },
})

const FloovioDialog = (props) => {
    const classes = useStyles();
    const [mediaDialogOpen, setMediaDialogOpen] = useState(false);
    const isValid = (props.name !== '' && props.content)

    const handleMediaDialogClose = () => {
        setMediaDialogOpen(false);
    };

    const handleMediaDialogOpen = () => {
        setMediaDialogOpen(true);
    };

    const handleSave = () => {
        const exerciseData = {
            name: props.name,
            content: props.content
        }

        saveNewExercise(props.courseId, props.user, exerciseData)
            .then(res => {
                createNewExerciseItem(props.activeListId, props.courseId, props.user, props.name, res.path);
            })
            // .then(() => {props.handleClose()})
            .catch(err => {
                console.error(err);
            })
    };

    return (
        <>
            <Dialog open={props.open} className={classes.root} maxWidth={false} onClose={props.handleClose} >
                <DialogTitle>
                    <TextField fullWidth label="Exercise name" value={props.name} onChange={(e) => props.setName(e.target.value)} />
                </DialogTitle>
                <DialogContent>
                    <Editor  />
                </DialogContent>
                <DialogActions className={classes.actions}>
                    <div className={classes.leftControls}>
                        <Button autoFocus onClick={handleMediaDialogOpen} color="primary">
                            View Media
                        </Button>
                    </div>
                    <div className={classes.rightControls}>
                        <Button autoFocus onClick={props.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button disabled={!isValid} onClick={handleSave} color="primary" variant="contained">
                            Save
                        </Button>
                    </div>
                </DialogActions>
                <MediaListDialog
                    open={mediaDialogOpen}
                    handleClose={handleMediaDialogClose}
                    courseId={props.courseId}
                />
            </Dialog>
        </>
    );
}

const mapStateToProps = state => {
    return {
        open: state.floovio.open,
        activeListId: state.floovio.listId,
        name: state.floovio.name,
        content: state.floovio.content,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        handleClose: () => {dispatch(cancelFloovio())},
        setName: (value) => {dispatch(updateName(value))}
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(FloovioDialog);