import React, { useState, useEffect } from 'react';
import firebase from '../../firebase';

const NewSolver = (props) => {
    const [data, setData] = useState({
        tags: [],
        rawHtml: "",
        transformedHtml: "",
        json: {},
        title: "",
        createdAt: {},
        exerciseId: ""
    });

    // console.log(props);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const result = await axios(
    //             `http://localhost:5000/dialetton/europe-west1/api/exercise/${props.match.params.exerciseId}`
    //         );
    //         setData(result.data);
    //         console.log(result.data.json);
    //     };
    //     fetchData();
    // }, [props.match.params.exerciseId]);

    useEffect(() => {
        const fetchData = async () => {
            const db = firebase.firestore();
            const data = await (await db.doc(`/exercises/${props.match.params.exerciseId}`).get()).data();
            setData({...data, exerciseId: props.match.params.exerciseId});
        };
        fetchData();
    }, [props.match.params.exerciseId]);

    console.log(data);
        


    function renderer(config) {
        if (config.node === "text") {
            return config.text
        } else {
            return React.createElement(
                config.tag,
                config.attr,
                config.child && (typeof config.child === "string"
                    ? config.child
                    : config.child.map(c => renderer(c)))
            );
        }
    }

    return (
        <div>
            {(data.exerciseId !== "") ? renderer(data.json) : null}
        </div>
    );
}
 
export default NewSolver;