import React from 'react';
import { IconButton } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const ExpandListButton = ({ onToggle, collapsed }) => {
    return (
        <IconButton aria-label="expand row" size="small" onClick={onToggle}>
            {collapsed ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
        </IconButton>
    );
}
 
export default ExpandListButton;