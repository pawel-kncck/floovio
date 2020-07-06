import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, makeStyles } from '@material-ui/core';
import Editor from './Editor';
import { connect } from 'react-redux';

const useStyles = makeStyles({
    root: {
        zIndex: 200,
    }
})

const SegmentDialog = (props) => {
    const classes = useStyles();

    const handleDialogCancel = () => {
        setOpen(false);
    }

    const handleCreateSegment = () => {
        props.addExercise(outputParsed,rawHtml);
        setOpen(false);
    }

    const handleUpdateSegment = () => {
        props.updateExercise(outputParsed,rawHtml,activeExercise);
        setOpen(false);
    }

    const handleEditorChange = (editorOutput) => {
        setParsedOutput(OutputParser(editorOutput));
        setRawHtml(editorOutput);
    }

    return (
        <>
            <Dialog open={props.open}>
                <DialogTitle>
                    Create new exercise
                </DialogTitle>
                <DialogContent>
                    <Editor transformOutput={(content) => handleEditorChange(content)} initialContent={props.data.segments[activeSegment].htmlString} />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleDialogCancel} color="primary">
                        Cancel
                    </Button>
                    {(activeExercise === -1) 
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
        data: state.lesson.lessonData,
        mode: state.lesson.lessonMode,
        open: state.dialog.open,
        activeSegment: state.dialog.activeSegment,
        segmentType: state.lesson.lessonData.segments[state.dialog.activeSegment].type, // image, exercise
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
 
export default connect(mapStateToProps,mapDispatchToProps)(SegmentDialog);