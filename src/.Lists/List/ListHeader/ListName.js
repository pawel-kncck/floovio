import React from 'react';
import { Typography } from '@material-ui/core';

const ListName = ({ name }) => {
    return (
        <Typography variant="h6" color="textPrimary">
            {name}
        </Typography>
    );
}
 
export default ListName;