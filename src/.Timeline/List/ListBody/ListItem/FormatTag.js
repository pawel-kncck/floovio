import React from 'react';
import { Chip } from '@material-ui/core';

const FormatTag = ({ format }) => {
    const display = (format !== '' && typeof format === 'string' && format.length < 5)
    
    return (
        <>
            {(display) ? <Chip label={format} /> : null}
        </>
    );
}
 
export default FormatTag;