import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import NewListDialog from './NewListDialog';
import AddIcon from '@material-ui/icons/Add';

const styles = {
    root: {
        display: 'flex',
        justifyContent: 'center',
        margin: '50px 0px 100px 0px',
    }
}

const AddNewList = ({ courseId, user }) => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <>
            <div style={styles.root}>
                <Button color="primary" variant='contained' fullWidth={false} onClick={handleClick} startIcon={<AddIcon />}>Add new lesson</Button>
            </div>
            <NewListDialog open={open} close={handleClose} courseId={courseId} user={user} />
        </>
    );
}
 
export default AddNewList;