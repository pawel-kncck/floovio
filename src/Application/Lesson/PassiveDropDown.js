import React from 'react';
import { makeStyles, MenuItem, Select, FormControl } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        display: 'inline',
    },
    select: {
        width: '150px',
    }
})


const PassiveDropDown = (props) => {
    const classes = useStyles();

    return (
        <FormControl className={classes.root}>
            <Select id={props.id} className={classes.select}>
                {props.options.map((el,index) => {
                    return <MenuItem key={index} value={el}>{el}</MenuItem>
                })}
            </Select>
        </FormControl>
    );
};
 
export default PassiveDropDown;