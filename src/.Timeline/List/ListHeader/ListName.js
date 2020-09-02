import React from 'react';
import { Typography } from '@material-ui/core';

const ListName = ({ name }) => {
    return (
        <Typography variant="h4">
            {name}
        </Typography>
    );
}
 
export default ListName;