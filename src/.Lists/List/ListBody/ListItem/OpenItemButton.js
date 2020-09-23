import React, { useState } from 'react';
import { IconButton } from '@material-ui/core';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import ImageViewer from '../../Views/ImageViewer';
import PdfViewer from '../../Views/PdfViewer';
import { getExercise } from '../../../BackendFunctions';
import ExerciseViewer from '../../Views/ExerciseViewer';
import ImageIcon from '@material-ui/icons/ImageOutlined';
import PdfIcon from '@material-ui/icons/PictureAsPdfOutlined';
import FileIcon from '@material-ui/icons/InsertDriveFileOutlined';
import LinkIcon from '@material-ui/icons/LinkOutlined';
import ExerciseIcon from '@material-ui/icons/LibraryAddCheckOutlined';

const OpenItemButton = ({ itemData }) => {
    const [imageViewerOpen, setImageViewerOpen] = useState(false);
    const [pdfViewerOpen, setPdfViewerOpen] = useState(false);
    const [exerciseViewerOpen, setExerciseViewerOpen] = useState(false);
    const [exerciseJson, setExerciseJson] = useState('');

    const typeToIcon = {
        image: <ImageIcon color="primary" />,
        pdf: <PdfIcon color="primary" />,
        link: <LinkIcon color="primary" />,
        exercise: <ExerciseIcon color="primary" />
    }

    const icon = (typeToIcon[itemData.type]) ? typeToIcon[itemData.type] : <FileIcon color="primary" />

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
        if (type === 'image') {
            setImageViewerOpen(true);
        } else if (type === 'exercise') {
            getExercise(itemData.url)
                .then(res => {
                    setExerciseJson(res.content.json);
                    setExerciseViewerOpen(true);
                })
                .catch(err => {
                    console.error(err)
                })
        }
    }

    const variants = {
        link: <a href={itemData.url} target='_blank' style={{ color: 'inherit' }}>{icon}</a>,
        pdf: <a href={itemData.url} target='_blank' style={{ color: 'inherit' }}>{icon}</a>,
    }

    return (
        <>
        <IconButton aria-label="open in dialog" size="small" onClick={() => handleClick(itemData.type)}>
            {(variants[itemData.type]) ? variants[itemData.type] : icon }
        </IconButton>
        {(imageViewerOpen) ? <ImageViewer url={itemData.url} open={imageViewerOpen} close={handleImageViewerClose} /> : null}
        {(pdfViewerOpen) ? <PdfViewer url={itemData.url} open={pdfViewerOpen} close={handlePdfViewerClose} /> : null}
        {(exerciseViewerOpen) ? <ExerciseViewer open={exerciseViewerOpen} close={setExerciseViewerClose} itemData={itemData} /> : null}
        </>
    );
}
 
export default OpenItemButton;