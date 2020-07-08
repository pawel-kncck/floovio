import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, makeStyles } from '@material-ui/core';
import Editor from './Editor';
import { connect } from 'react-redux';
import { setDialog } from '../../../.Store/dialog.actions';
import { addExercise, updateExercise } from '../../../.Store/lesson.actions';
import OutputParser from '../../../.Utilities/OutputParser';


const useStyles = makeStyles({
    root: {
        zIndex: 200,
    }
})

const SegmentDialog = (props) => {
    const classes = useStyles();

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

    return (
        <>
            <Dialog open={props.open}>
                <DialogTitle>
                    Create new exercise
                </DialogTitle>
                <DialogContent>
                    <Editor transformOutput={(content) => handleEditorChange(content)} initialContent={props.html} />
                </DialogContent>
                <DialogActions>
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
                </DialogActions>
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