import React, { useState } from 'react';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { IconButton } from '@material-ui/core';
import OptionsMenu from './OptionsMenu';

const ListOptions = ({ listData, courseId, listId }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
        <IconButton aria-label="list options" size="small" onClick={handleClick}>
            <MoreHorizIcon />
        </IconButton>
        <OptionsMenu open={open} onClose={handleClose} anchorEl={anchorEl} listData={listData} listId={listId} courseId={courseId} />
        </>
    );
}
 
export default ListOptions;