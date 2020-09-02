import React from 'react';
import { IconButton } from '@material-ui/core';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

const OpenItemButton = ({ itemData }) => {

    const handleClick = () => {
        console.log(`Open icon clicked on item ${itemData.name}`)
    }

    return (
        <IconButton aria-label="open in dialog" size="small" onClick={handleClick}>
            <OpenInNewIcon />
        </IconButton>
    );
}
 
export default OpenItemButton;