import React, { useEffect } from 'react';
import { Dialog, DialogContent, DialogActions, Button } from '@material-ui/core';
import firebase from '../../../.Database/firebase';
import ExcerciseRender from '../../../.Exercise/functions/render';
import { setFloovioInState, cancelFloovio } from '../../../.Store/floovio.actions';
import { updateAnswersInExercise } from '../../BackendFunctions';
import { connect } from 'react-redux';

const ExerciseViewer = ({ open, close, itemData, json, setExercise, resetExercise, exerciseData }) => {
    const isValid = true;

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
                console.log("Exercise saved. Server response: " + res)
                close();
            })
            .catch(err => { console.error(res)})
    }

    return (
        <Dialog open={open} onClose={close}>
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