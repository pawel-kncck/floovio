import React from 'react';
import { Typography } from '@material-ui/core';

const ItemName = ({ name }) => {
    return (
        <Typography variant='subtitle1' >
            {name}
        </Typography>
    );
}
 
export default ItemName;