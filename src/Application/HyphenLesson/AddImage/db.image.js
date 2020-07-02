import { storage } from '../../../firebase';
import { v4 as uuid } from 'uuid'

export const firebaseImageUpload = (imageAsFile) => {
    const imageId = uuid();
    storage.ref(`/images/${imageId}`).put(imageAsFile)
        .then(res => {
            return storage.ref(res.ref.fullPath).getDownloadURL()
        })
        .catch(err => {
            console.error(err)
        })

        // uploadTask.on('state_changed', (snapShot) => {
        //     //takes a snap shot of the process as it is happening
        //     console.log(snapShot)
        // }, (err) => {
        //     console.log(err)
        // }, () => {
        //     // gets the functions from storage refences the image storage in firebase by the children
        //     // gets the download url then sets the image from firebase as the value for the imgUrl key:
        //     storage.ref('images').child(imageId).getDownloadURL()
        //     .then(fireBaseUrl => {
        //         // setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}))
        //         console.log(prevObject => ({...prevObject, imgUrl: fireBaseUrl}));
        //         console.log(fireBaseUrl);
        //     })
        // })
}
