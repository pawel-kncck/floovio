import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, makeStyles } from '@material-ui/core';
import Editor from './Editor';
import { connect } from 'react-redux';
import { setDialog } from '../../../.Store/dialog.actions';
import { addExercise, updateExercise } from '../../../.Store/lesson.actions';
import OutputParser from '../../../.Utilities/OutputParser';
import MediaListDialog from './MediaListDialog';


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

const SegmentDialog = (props) => {
    const classes = useStyles();
    const [mediaDialogOpen, setMediaDialogOpen] = useState(false);

    const handleDialogCancel = () => {
        props.setDialog(false,null,0,"",{})
    }

    const handleCreateSegment = () => {
        const json = OutputParser(props.html);
        const html = props.html;

        props.addExercise(json,html);
    }

    const handleUpdateSegment = () => {
        const json = OutputParser(props.html);
        const html = props.html;

        props.updateExercise(json, html);
    }

    const handleEditorChange = (editorOutput) => {
        const json = OutputParser(editorOutput);
        props.setDialog(true,'exercise',props.index,editorOutput,json)
    }

    const handleMediaDialogClose = () => {
        setMediaDialogOpen(false);
    };

    const handleMediaDialogOpen = () => {
        setMediaDialogOpen(true);
    };

    return (
        <>
            <Dialog open={props.open} className={classes.root} maxWidth={false}>
                <DialogTitle>
                    Create new exercise
                </DialogTitle>
                <DialogContent>
                    <Editor transformOutput={(content) => handleEditorChange(content)} initialContent={props.html} />
                </DialogContent>
                <DialogActions className={classes.actions}>
                    <div className={classes.leftControls}>
                        <Button autoFocus onClick={handleMediaDialogOpen} color="primary">
                            View Media
                        </Button>
                    </div>
                    <div className={classes.rightControls}>
                        <Button autoFocus onClick={handleDialogCancel} color="primary">
                            Cancel
                        </Button>
                        {(props.index === -1) 
                        ?   <Button autoFocus onClick={handleCreateSegment} color="primary" variant="contained">
                                Add new
                            </Button>
                        :   <Button autoFocus onClick={handleUpdateSegment} color="primary" variant="contained">
                                Save changes
                            </Button>}
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
        index: state.lesson.dialog.index,
        html: state.lesson.dialog.html,
        json: state.lesson.dialog.json,
        open: state.lesson.dialog.open,
        courseId: state.course.data.uid
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setDialog: (open,type,index,html,json) => {dispatch(setDialog(open,type,index,html,json))},
        addExercise: (json,html) => {dispatch(addExercise(json,html))},
        updateExercise: (json,html) => {dispatch(updateExercise(json,html))},
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(SegmentDialog);