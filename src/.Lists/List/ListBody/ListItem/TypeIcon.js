import React from 'react';
import ImageIcon from '@material-ui/icons/ImageOutlined';
import PdfIcon from '@material-ui/icons/PictureAsPdfOutlined';
import FileIcon from '@material-ui/icons/InsertDriveFileOutlined';
import LinkIcon from '@material-ui/icons/LinkOutlined';
import ExerciseIcon from '@material-ui/icons/LibraryAddCheckOutlined';


const TypeIcon = ({ type }) => {

    const typeToIcon = {
        image: <ImageIcon color="primary" fontSize="small" />,
        pdf: <PdfIcon color="primary" fontSize="small" />,
        link: <LinkIcon color="primary" fontSize="small" />,
        exercise: <ExerciseIcon color="primary" fontSize="small" />
    }

    return (
        <>
            {(typeToIcon[type]) ? typeToIcon[type] : <FileIcon color="primary" fontSize="small" />}
        </>
    );
}
 
export default TypeIcon;