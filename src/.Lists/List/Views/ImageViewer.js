import React from 'react';
import { Dialog, DialogContent, TextField, DialogActions, Button } from '@material-ui/core';


const ImageViewer = ({ url, open, close }) => {
    return (
        <Dialog open={open} onClose={close} maxWidth='900px'>
            <DialogContent>
                <img src={url} alt='image viewer' />
            </DialogContent>
        </Dialog>
    );
}
 
export default ImageViewer;