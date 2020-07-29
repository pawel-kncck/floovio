import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, Divider, DialogActions, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    codeContainer: {
        margin: "20px 0",
        color: "#000"
    }
})

const InviteDialog = (props) => {
    const classes = useStyles();

    const handleClose = () => {
        props.onClose()
    }
    return (
        <Dialog open={props.open} onClose={props.onClose}>
            <DialogTitle>Invite code</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Share invite code with the student. They will use the code to join this course, by using "Join a course" on their home screen.
                </DialogContentText>
                <Divider />
                <DialogContentText className={classes.codeContainer}>
                    Invite code: {props.courseId}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" color="primary" onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}
 
export default InviteDialog;