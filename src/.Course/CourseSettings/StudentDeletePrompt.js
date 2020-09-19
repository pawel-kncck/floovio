import React from 'react'; 
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import WarningIcon from '@material-ui/icons/Warning';
import { removeUserRoleInCourse } from '../../.Database/BackendFunctions';

const StudentDeleteConformation = ({ close, courseId, studentId }) => {

    const handleDelete = () => {
        console.log(`Delete student ${studentId} from course ${courseId}`);
        removeUserRoleInCourse(courseId, studentId, 'student');
        close();
    }

    return (
        <Dialog open={true} onClose={close}>
            <DialogTitle>
                Do you want to remove this student?
            </DialogTitle>
            <DialogContent>
                This student will be removed from the lesson. In case you change your mind, you can always invite them again.
            </DialogContent>
            <DialogActions>
                <Button color='primary' variant='contained' onClick={close}>Go back</Button>
                <Button 
                    variant='outlined'
                    onClick={handleDelete}
                    startIcon={<WarningIcon />}
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}
 
export default StudentDeleteConformation;