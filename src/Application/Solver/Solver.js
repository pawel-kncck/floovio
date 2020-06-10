import React, { useState,useEffect } from 'react';
import HTMLTransformer from '../../Utilities/HTMLTransformer';
import NewParser from '../../Utilities/TestNewParser';
import BaseButton from "../../Components/BaseButton";
import axios from 'axios';
import { Link } from 'react-router-dom';
import LargeButton from '../../Components/LargeButton';
import firebase from '../../firebase';
import GapFillerA from '../AnswerComponents/Input';
import { connect } from 'react-redux';
import { loadActiveExerciseToState } from '../../Store/actions';

const Solver = (props) => {
    const [sharableLink, setSharableLink] = useState("")
    // const [data, setData] = useState({
    //     tags: [],
    //     rawHtml: "",
    //     title: "",
    //     createdAt: {},
    //     exerciseId: ""
    // });

    const componentMap = {
        gapfiller: GapFillerA
    }

    // console.log(props);

    useEffect(() => {
        const fetchData = async () => {
            const db = firebase.firestore();
            const data = await (await db.doc(`/exercises/${props.match.params.exerciseId}`).get()).data();
            props.loadExercise({...data, exerciseId: props.match.params.exerciseId}, props.match.params.exerciseId);
        };
        fetchData();
    }, []);

    function updateHandler() {
        const db = firebase.firestore();
        db.collection("exercises").doc(props.exerciseId).set(props.activeExercise)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.error(err);
            })
    }

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const result = await axios(
    //             `http://localhost:5000/dialetton/europe-west1/api/exercise/${props.match.params.exerciseId}`
    //         );
    //         setData(result.data);
    //     };
    //     fetchData();
    // }, [props.match.params.exerciseId]);


    // function changeHandler(target) {
    //     const regexp = /<input.*?>/gum;
    //     const allNodes = NewParser(data.rawHtml) // .__html // match(regexp);
    //     console.log(allNodes);
        
    // }

    function renderer(config) {
        if (config.node === "text") {
            return config.text
        } else {
            return React.createElement(
                componentMap[config.tag] || config.tag,
                config.attr,
                config.child && (typeof config.child === "string"
                    ? config.child
                    : config.child.map(c => renderer(c)))
            );
        }
    }

    // function debug(arg1) {
    //     console.log(arg1);
    // }

    return (
        <div className="app-solver">
            <div className="solver-header">
                <h1>Solver</h1>
                <div className="divider-h1" />
                <Link to="/"><LargeButton value="Go back to exercise list" /></Link>
            </div>
            <div className="solver">
                <div className="solver-title">{props.title}</div>
                <div className="solver-body">
                    {/* {(data !== null) ? <div dangerouslySetInnerHTML={NewParser(data.rawHtml)} onKeyUp={(event) => changeHandler(event.target)} /> : null} */}
                    {(props.json !== "") ? renderer(props.json) : null}
                    {/* {(props.exerciseId !== "") ? debug(props.json) : null} */}
                    {/* {debug(props.answers)} */}

                </div>
                <div className="solver-footer">
                    <BaseButton value="Save" onClick={updateHandler}/>
                    <BaseButton 
                        value="Share" 
                        onClick={() => setSharableLink("dummy sharable link")}/>
                    <div 
                        className={sharableLink === "" ? "solver-solution-link" : "solver-solution-link active"}
                        >
                            {sharableLink === "" ? null : <a href={`/solve/${props.match.params.exerciseId}`} rel="noopener noreferrer" target="_blank">{props.location.pathname}</a>}
                        </div>
                </div>
            </div>
        </div>
        

    );
}

const mapStateToProps = (state,ownProps) => {
    return {
        json: state.activeExercise.json,
        title: state.activeExercise.title,
        exerciseId: state.activeExercise.exerciseId,
        answers: state.activeExercise.answer,
        activeExercise: state.activeExercise,
    }
}

const mapDispatchToProps = dispatch => {
    return {
      loadExercise: (exercise,exerciseId) => {dispatch(loadActiveExerciseToState(exercise,exerciseId))},
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Solver);