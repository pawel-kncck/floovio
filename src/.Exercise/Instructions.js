import React from 'react';
import { Dialog, DialogContent } from '@material-ui/core';

const rows = [
    {code: '[]   (empty square brackets)', explanation: 'Text field'},
    {code: '[Option 1,Option 2,Option 3]', explanation: 'Dropdown list'},
    {code: '{Option 1,Option 2,Option 3}', explanation: 'Single choice question'},
    {code: '<4>', explanation: 'Text area with 4 rows. Number of rows can be changed and is optional. Maximum number of rows is 21.'},
    {code: '<img,4t6ry5u66,200>', explanation: 'Image. Code represents image file, that should be used (can be found in "media viewer. Last numnber represents height of the image.'},
]

const Instructions = ({ close }) => {
    return (
        <Dialog open={true} onClose={close}>
            <DialogContent>
                <table className='inside-exercise-table' style={{ width: '100%' }}>
                    <tbody>
                        {rows.map((row,index) => {
                            return (
                                <tr key={index}>
                                    <td style={{ width: '40%' }}>
                                        {row.code}
                                    </td>
                                    <td style={{ width: '60%' }}>
                                        {row.explanation}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </DialogContent>
        </Dialog>
    );
}
 
export default Instructions;