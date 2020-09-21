import React, { useEffect } from 'react';
import { Dialog, DialogContent, DialogActions, Button, makeStyles } from '@material-ui/core';
import firebase from '../../../.Database/firebase';
import ExcerciseRender from '../../../.Exercise/functions/render';
import { setFloovioInState, cancelFloovio } from '../../../.Store/floovio.actions';
import { updateAnswersInExercise } from '../../BackendFunctions';
import { connect } from 'react-redux';

const useStyles = makeStyles({
    root: {
        // maxWidth: '900px',
        padding: '20px'
    }
})

const ExerciseViewer = ({ open, close, itemData, json, setExercise, resetExercise, exerciseData }) => {
    const isValid = true;
    const classes = useStyles();

    useEffect(() => {
        const  unsubscribe = firebase.firestore().doc(itemData.url)
            .onSnapshot((snapshot) => {
                setExercise(snapshot.data());
        });
        return () => {
            unsubscribe();
            resetExercise();
        }
    },[firebase])

    const handleSave = () => {
        updateAnswersInExercise(itemData.url, exerciseData)
            .then(res => { 
                close();
            })
            .catch(err => { console.error(res)})
    }

    return (
        <Dialog open={open} onClose={close} className={classes.root}>
            <DialogContent>
                {json ? ExcerciseRender(json) : null}
            </DialogContent>
            <DialogActions>
                <Button size='small' color='primary' variant='outlined' onClick={close}>Cancel</Button>
                <Button disabled={!isValid} size='small' color='primary' variant='contained' onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    );
}

const mapStateToProps = state => {
    return {
        json: state.floovio.content.json,
        exerciseData: state.floovio,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setExercise: (object) => {dispatch(setFloovioInState(object))},
        resetExercise: () => {dispatch(cancelFloovio())}
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(ExerciseViewer);