import React, { useState } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import NewListDialog from './NewListDialog';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '100px',
    }
})

const AddNewList = ({ courseId, user }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <>
            <div className={classes.root}>
                <Button color="primary" variant='contained' fullWidth={false} onClick={handleClick}>Add new list</Button>
            </div>
            <NewListDialog open={open} close={handleClose} courseId={courseId} user={user} />
        </>
    );
}
 
export default AddNewList;