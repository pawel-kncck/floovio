import React, { useState } from 'react';
import BaseButton from "../../Components/BaseButton"
import ViewToggle from './ViewToggle/ViewToggle';
import { closeBuilder,cleanExerciseState } from '../../Store/actions';
import { connect } from 'react-redux';
import EditingView from './BuilderBody/EditingView';
import PreviewView from './BuilderBody/PreviewView';
import firebase from '../../firebase';

const Builder = (props) => {
    const [editorMode,setEditorMode] = useState(true);
    // const [createMode,setCreateMode] = useState(true);

    const toggleEditorPreview = (modeIdFromViewToggle) => {
        if (modeIdFromViewToggle === "editor"){
            setEditorMode(true);
        } else {
            setEditorMode(false);
        }
    };

    function saveHandler() {
        const db = firebase.firestore();
        db.collection("exercises").add(props.newExercise)
            .then((res) => {
                props.closeBuilder();
                props.cleanExerciseState();
                console.log(res);
            })
            .catch((err) => {
                console.error(err);
            })
    }

    function updateHandler() {
        const db = firebase.firestore();
        db.collection("exercises").doc(props.activeId).set(props.newExercise)
            .then((res) => {
                props.closeBuilder();
                props.cleanExerciseState();
                console.log(res);
            })
            .catch((err) => {
                console.error(err);
            })
    }

    return (
        <div className="builder-dialog">

            <div className="builder-dialog-header">
                <div className="builder-dialog-header-title">{(props.activeId === "") ? "Create new exercise" : "Update exercise"}</div>
                <div className="builder-dialog-header-input">
                    <ViewToggle toggleEditorPreview={toggleEditorPreview} />
                </div>
            </div>
            
            {editorMode ? <EditingView /> : <PreviewView />}

            <div className="builder-dialog-actions">
                <BaseButton value="Cancel" secondary onClick={props.closeBuilder} />
                <BaseButton value="Save" primary onClick={(props.activeId === "") ? saveHandler : updateHandler} />
            </div>
            
        </div>
    );
}

const mapStateToProps = state => {
    return {
      newExercise: state.newExercise,
      activeId: state.activeId
    }
}

const mapDispatchToProps = dispatch => {
    return {
      closeBuilder: () => {dispatch(closeBuilder())},
      cleanExerciseState: () => {dispatch(cleanExerciseState())},
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(Builder);