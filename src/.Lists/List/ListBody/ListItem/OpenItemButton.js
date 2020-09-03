import React from 'react';
import { IconButton } from '@material-ui/core';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

const linkStyle = {
    textDecoration: 'none',
    '&:hover': {
        color: '#555',
    },
    '&:visited': {
        color: '#555',
    },
    '&:active': {
        color: '#555',
    }
}

const OpenItemButton = ({ itemData }) => {

    const handleClick = () => {
        console.log(`Open icon clicked on item ${itemData.name}`)
    }

    const variants = {
        link: <a href={itemData.url} target='_blank' style={{ color: 'inherit' }}><OpenInNewIcon /></a>
    }

    return (
        <IconButton aria-label="open in dialog" size="small" onClick={handleClick}>
            {(variants[itemData.type]) ? variants[itemData.type] : <OpenInNewIcon /> }
        </IconButton>
    );
}
 
export default OpenItemButton;