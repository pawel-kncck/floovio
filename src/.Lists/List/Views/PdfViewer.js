import React from 'react';
import { Dialog, DialogContent, TextField, DialogActions, Button } from '@material-ui/core';
import { Document } from 'react-pdf';


const PdfViewer = ({ url, open, close }) => {
    return (
        <Dialog open={open} onClose={close}>
            <DialogContent>
                <Document file={url} />
            </DialogContent>
        </Dialog>
    );
}
 
export default PdfViewer;