import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MediaList from './../../../.Media/MediaList';

const MediaListDialog = (props) => {
  const descriptionElementRef = React.useRef(null);

  React.useEffect(() => {
    if (props.open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [props.open]);

  return (
    <Dialog
        open={props.open}
        onClose={props.handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
    >
        <DialogTitle id="scroll-dialog-title">Media list</DialogTitle>
        <DialogContent dividers>
            <MediaList courseId={props.courseId} />
        </DialogContent>
        <DialogActions>
            <Button onClick={props.handleClose} color="primary">
                Close
            </Button>
        </DialogActions>
    </Dialog>
  );
}

export default MediaListDialog;