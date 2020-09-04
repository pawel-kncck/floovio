import React from 'react';
import { Dialog, DialogContent } from '@material-ui/core';
import ExcerciseRender from '../../../.Exercise/functions/render';

const ExerciseViewer = ({ open, close, json }) => {
    return (
        <Dialog open={open} onClose={close}>
            <DialogContent>
                {ExcerciseRender(json)}
            </DialogContent>
        </Dialog>
    );
}
 
export default ExerciseViewer;