import React, { useState } from 'react';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { deleteItem, getExercise } from '../../../BackendFunctions';
import { updateName, updateFloovio, openFloovio, setPath } from '../../../../.Store/floovio.actions';
import { setActivePath } from '../../../../.Store/course.actions';
import { connect } from 'react-redux';

const ItemOptions = ({ itemId, listId, courseId, itemData, ...props }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEditExercise = () => {
        getExercise(itemData.url)
            .then(exerciseData => {
                props.loadExercise(exerciseData, itemData.url);
                props.setActivePath(courseId, listId, itemId);
                setAnchorEl(null);
            })
            .catch(err => {
                console.error(err);
            })
    }

    return (
        <>
        <IconButton aria-label="item options" size="small" onClick={handleClick}>
            <MoreHorizIcon />
        </IconButton>
        <Menu
            id="fade-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
        >
            {(itemData.type === 'exercise') ? <MenuItem onClick={handleEditExercise}>Edit exercise</MenuItem> : null}
            <MenuItem onClick={() => deleteItem(itemId, listId, courseId)}>Delete</MenuItem>
            {/* <MenuItem disabled onClick={handleClose}>Duplicate</MenuItem> */}
            {/* <MenuItem disabled onClick={handleClose}>Move to another list</MenuItem> */}
        </Menu>
        </>
    );
}

const mapStateToProps = state => {
    return {
        html: state.floovio.content.html,
        json: state.floovio.content.json,
        name: state.floovio.name,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        loadExercise: (exerciseData, path) => {
                dispatch(updateName(exerciseData.name))
                dispatch(updateFloovio(exerciseData.content.json, exerciseData.content.html))
                dispatch(openFloovio())
                dispatch(setPath(path))
            },
        setActivePath: (courseId, listId, itemId) => {dispatch(setActivePath(courseId, listId, itemId))}
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(ItemOptions);