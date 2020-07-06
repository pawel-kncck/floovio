import React from 'react';

const SegmentDialog = () => {
    return (
        <>
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

            {(imgDialogOpen) 
                ? <AddImage 
                    activeExercise={activeExercise} 
                    handleCancel={handleCancelImageUploader} 
                    handleSave={(url) => handleAddImage(url)}
                    /> 
                : null
            }
        </>
    );
}
 
export default SegmentDialog;