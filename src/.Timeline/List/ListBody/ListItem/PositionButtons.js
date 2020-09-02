import React from 'react';
import { ArrowDropUp, ArrowDropDown } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        display: 'flex',
    }
})

const PositionButtons = ({ index }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <ArrowDropUp fontSize="small" />
            <ArrowDropDown fontSize="small" />
        </div>
    );
}
 
export default PositionButtons;