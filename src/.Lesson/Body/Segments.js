import React from 'react';
import EditingPanel from './EditingPanel';
import { Paper, makeStyles } from '@material-ui/core';
import Renderer from '../../.Utilities/Renderer';
import { connect } from 'react-redux';

const useStyles = makeStyles({
    exrcContainer: {
        padding: '10px',
        display: 'flex',
        justifyContent: 'center'
    },
    exrcContainerEdit: {
        padding: '10px',
        display: 'flex',
        justifyContent: 'center',
        border: '1px dashed #ccc',
        margin: '10px',  
    },
    exrcContent: {
        flexGrow: '1',
        marginLeft: '20px'
    },
});

const Segments = (props) => {
    const classes = useStyles();

    return (
        <>
            {props.data.elements.map((el,index) => {
            return (
                    <Paper key={index} elevation={0} className={(props.mode === 'edit') ? classes.exrcContainerEdit : classes.exrcContainer}>
                        <div className={classes.exrcContent}>
                            {Renderer(el.json)}
                        </div>
                        {(props.mode === 'edit' || props.mode === 'new') 
                            ?   <EditingPanel />
                            :   null
                        }
                    </Paper>
                )
            })}
        </>
    );
}

const mapStateToProps = state => {
    return {
        data: state.lesson.lessonData,
        mode: state.lesson.lessonMode,
    }
};

export default connect(mapStateToProps,null)(Segments);