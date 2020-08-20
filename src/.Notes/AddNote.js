import React, { useState } from 'react';
import { makeStyles, FormGroup, TextField, Button } from '@material-ui/core';
import { sendNote } from '../.Database/db.course';

const useStyles = makeStyles({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
    },
})


const AddNote = (props) => {
    const classes = useStyles();
    const [note,setNote] = useState("");

    const handleSendClick = () => {
        if (note !== "") {
            sendNote(props.courseId,note,props.user);
        }
        setNote('');
    }

    const handlePressEnter = (event) => {
        event.preventDefault();
        if (note !== "") {
            sendNote(props.courseId,note,props.user);
        }
        setNote('');
    }

    return (
        <FormGroup className={classes.root} onSubmit={(e) => handlePressEnter(e)}>
            <TextField
                id="outlined-multiline-static"
                label="Add a new note"
                multiline
                fullWidth
                rows={4}
                defaultValue="Default Value"
                variant="outlined"
                value={note}
                onChange={(e) => setNote(e.target.value)}
            />
            <Button
                color="primary"
                variant="contained"
                onClick={() => handleSendClick()}
            >Add note</Button>
        </FormGroup>
    );
}
 
export default AddNote;