import React, { useState } from 'react';
import { IconButton } from '@material-ui/core';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import ImageViewer from '../../Views/ImageViewer';
import PdfViewer from '../../Views/PdfViewer';
import { getExercise } from '../../../BackendFunctions';
import ExerciseViewer from '../../Views/ExerciseViewer';

const linkStyle = {
    textDecoration: 'none',
    '&:hover': {
        color: '#555',
    },
    '&:visited': {
        color: '#555',
    },
    '&:active': {
        color: '#555',
    }
}

const OpenItemButton = ({ itemData }) => {
    const [imageViewerOpen, setImageViewerOpen] = useState(false);
    const [pdfViewerOpen, setPdfViewerOpen] = useState(false);
    const [exerciseViewerOpen, setExerciseViewerOpen] = useState(false);
    const [exerciseJson, setExerciseJson] = useState('');

    const handleImageViewerClose = () => {
        setImageViewerOpen(false);
    }

    const handlePdfViewerClose = () => {
        setPdfViewerOpen(false);
    }

    const setExerciseViewerClose = () => {
        setExerciseViewerOpen(false);
    }

    const handleClick = (type) => {
        console.log(`Open icon clicked on item ${itemData.name}`)
        if (type === 'image') {
            setImageViewerOpen(true);
        } else if (type === 'exercise') {
            getExercise(itemData.url)
                .then(res => {
                    setExerciseJson(res.content.json);
                    setExerciseViewerOpen(true);
                    console.log(res);
                })
                .catch(err => {
                    console.error(err)
                })
        }
    }

    const variants = {
        link: <a href={itemData.url} target='_blank' style={{ color: 'inherit' }}><OpenInNewIcon /></a>,
        pdf: <a href={itemData.url} target='_blank' style={{ color: 'inherit' }}><OpenInNewIcon /></a>,
    }

    return (
        <>
        <IconButton aria-label="open in dialog" size="small" onClick={() => handleClick(itemData.type)}>
            {(variants[itemData.type]) ? variants[itemData.type] : <OpenInNewIcon /> }
        </IconButton>
        {(imageViewerOpen) ? <ImageViewer url={itemData.url} open={imageViewerOpen} close={handleImageViewerClose} /> : null}
        {(pdfViewerOpen) ? <PdfViewer url={itemData.url} open={pdfViewerOpen} close={handlePdfViewerClose} /> : null}
        {(exerciseViewerOpen) ? <ExerciseViewer open={exerciseViewerOpen} close={setExerciseViewerClose} json={exerciseJson} /> : null}
        </>
    );
}
 
export default OpenItemButton;