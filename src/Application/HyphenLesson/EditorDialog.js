import React from 'react';
import { Dialog, DialogTitle, DialogContent, Button } from '@material-ui/core';

// props needed: initialEditorContent, open
// functions from props: handleEditorChange, handleEditorCancel, handleEditorAddNewExercise, handleEditorUpdateExercise

const EditorDialog = (props) => {
    return (
        <Dialog open={open}>
            <DialogTitle>
                Create new exercise
            </DialogTitle>
            <DialogContent>
                <Editor transformOutput={(content) => handleEditorChange(content)} initialContent={initialEditorContent} />
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleEditorCancel} color="primary">
                    Cancel
                </Button>
                {(activeExercise === -1) 
                ?   <Button autoFocus onClick={handleEditorAddNewExercise} color="primary" variant="contained">
                        Add new
                    </Button>
                :   <Button autoFocus onClick={handleEditorUpdateExercise} color="primary" variant="contained">
                        Save changes
                    </Button>}
            </DialogActions>
        </Dialog>
    );
}
 
export default EditorDialog;



            