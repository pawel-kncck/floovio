import React from 'react';
import { TextField } from '@material-ui/core';
import { connect } from 'react-redux';

const Title = (props) => {
    return (
        <div>
            { 
            ((props.mode === 'new') || (props.mode === 'edit'))
                ? <TextField 
                    variant="outlined" 
                    id="title" 
                    label="Title" 
                    placeholder="Enter title of the lesson" 
                    fullWidth value={props.title} 
                    onChange={(e) => props.setTitle(e.target.value)} />
                : <h1>{props.title}</h1>
            }
        </div>
    );
}

const mapStateToProps = state => {
    return {
        mode: state.lesson.lessonMode,
        title: state.lesson.lessonData.title,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setTitle: (title) => {dispatch(setTitle(title))},
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Title);