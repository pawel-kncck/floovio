import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { setMode } from '../../.Store/lesson.actions';

const useStyles = makeStyles({
    root: {
        margin: '20px 0',
    }
})

const ModeSwitch = (props) => {
    const classes = useStyles();

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
            },
        },
    };

    const modeSwitchHandler = (e) => {
        props.setMode(e.target.value)
    }

    return (
        <FormControl className={classes.root}>
            <InputLabel id="demo-mutiple-name-label">Mode</InputLabel>
            <Select
                labelId="mode-selector-label"
                id="mode-selector"
                style={{ minWidth: '150px' }}
                defaultValue={props.mode}
                value={props.mode}
                onChange={modeSwitchHandler}
                MenuProps={MenuProps}
            >
                <MenuItem key='10' value='solve'>Student</MenuItem>
                <MenuItem key='20' value='check'>Teacher</MenuItem>
                <MenuItem key='30' value='edit'>Editor</MenuItem>
            </Select>
        </FormControl>
    );
}

const mapStateToProps = state => {
    return {
        mode: state.lesson.lessonMode,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setMode: (path) => {dispatch(setMode(path))},
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ModeSwitch);