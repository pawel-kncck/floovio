import React, { useState, useEffect } from 'react';
import firebase from '../../../../.Database/firebase';
import { duplicateList } from '../../../BackendFunctions';
import { Dialog, DialogTitle, DialogContent, RadioGroup, Radio, DialogActions, Button, FormControlLabel } from '@material-ui/core';

const CopyDialog = ({ close, listId, courseId }) => {
    const [coursesArray, setCoursesArray] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const user = firebase.auth().currentUser;

    useEffect(() => {
        
        const  unsubscribe = firebase.firestore().collection("courses").where('users', 'array-contains', user.uid)
            .onSnapshot((snapshot) => {
                let coursesFromSnapshot = [];
                snapshot.forEach(doc => {
                    coursesFromSnapshot.push(({...doc.data(), id: doc.id}));
                }); 
                setCoursesArray(coursesFromSnapshot);
        });
        return () => {
            unsubscribe();
        }
    },[firebase])

    const handleCopyList = () => {
        duplicateList(listId, courseId, selectedCourseId)
            .then(res => { console.log(res) })
            .catch(err => { console.error(err) })
    }

    return (
        <Dialog open={true} onClose={close}>
            <DialogTitle>
                Select course
            </DialogTitle>
            <DialogContent>
                <RadioGroup name="courses" value={selectedCourseId} onChange={(e) => setSelectedCourseId(e.target.value)}>
                    {coursesArray.map(course => {
                        const isThisCurrentCourse = (course.id === courseId);
                        return <FormControlLabel key={course.id} disabled={isThisCurrentCourse} value={course.id} control={<Radio />} label={course.name} />
                    })}
                </RadioGroup>
            </DialogContent>
            <DialogActions>
                <Button variant='outlined' size='small' color='primary' onClick={close}>Cancel</Button>
                <Button variant='contained' size='small' color='primary'onClick={handleCopyList} disabled={!Boolean(selectedCourseId)}>Copy</Button>
            </DialogActions>
        </Dialog>
    );
}
 
export default CopyDialog;