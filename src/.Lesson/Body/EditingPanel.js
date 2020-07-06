import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { setOpen, setActiveSegment } from '../../.Store/dialog.actions';
import { connect } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

// props = index, mode
const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
    }
})

const EditingPanel = (props) => {
    const classes = useStyles();
    
    const handleOpenEditorInEditMode = (index) => {
        props.setOpen(true);
        props.setActiveExercise(index);
        // setInitialEditorContent(props.data.htmlStrings[index].__html);
    }

    return (
        <div className={classes.editButtons}>
            <Button color="primary"><ArrowUpwardIcon /></Button>
            <Button color="primary"><ArrowDownwardIcon /></Button>
            <Button color="primary" onClick={() => handleOpenEditorInEditMode(index)}><EditIcon /></Button>
            <Button color="primary" onClick={() => props.deleteExercise(index)}><DeleteIcon /></Button>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        mode: state.lesson.lessonMode,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        deleteExercise: (index) => {dispatch(deleteExercise(index))},
        setOpen: (isOpen) => {dispatch(setOpen(isOpen))},
        setActiveSegment: (index) => {dispatch(setActiveSegment(index))},
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditingPanel);