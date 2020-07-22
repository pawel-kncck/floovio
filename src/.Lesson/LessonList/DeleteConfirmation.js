import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import { deleteLesson } from '../../.Database/db.lesson';

const LessonDeleteConfirmation = (props) => {
    const handleDelete = () => {
        props.close();
        deleteLesson(props.courseId, props.lessonId);
    }

    return (
        <div>
            <Dialog open={props.open} onClose={props.close}>
                <DialogTitle id="delete-confirmation-title">Delete this lesson permanently?</DialogTitle>
                <DialogContent>
                    <DialogContentText id="delete-confirmation-description">
                        Are you sure you want to delete this lesson permanently? This means that you will lose all data saved in this lesson, including images, exercises, saved answers and scores. You will not be able to restore this data.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.close} color="primary" autoFocus>
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="secondary">
                        Delete permanently
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
 
export default LessonDeleteConfirmation;