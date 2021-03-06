import React from 'react';
import { makeStyles, Typography, Box } from '@material-ui/core';

const useStyles = makeStyles({
    emptyState: {
        margin: '30px 0',
        width: '100%',
        height: '200px',
        border: '2px dashed #ddd',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        overflow: 'hidden',
    },
});

const EmptySegment = () => {
    const classes = useStyles();
    
    return (
        <Box className={classes.emptyState}>
            <Typography variant='h3'>Start building a new lesson!</Typography><br></br>
            <Typography variant='h6'>Click on the button below to add a first exercise</Typography>
        </Box>
    );
}
 
export default EmptySegment;