import React, { useState, useEffect } from 'react';
// import Accordion from './Accordion/Accordion'
import axios from 'axios';
import SearchIcon from '@material-ui/icons/Search';
import LargeButton from '../../Components/LargeButton'
import { connect } from 'react-redux';
import { openBuilder,loadExerciseToState,cleanExerciseState } from '../../Store/actions';
import { Link } from 'react-router-dom';
import OpenInNewOutlinedIcon from '@material-ui/icons/OpenInNewOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import Chip from '@material-ui/core/Chip';
import firebase from '../../firebase';


const List = (props) => {
    const [exercises, setExercises] = useState([]);
    const [activeExercise, setActiveExercise] = useState({
		title: "",
		rawHtml: "",
		transformedHtml: "",
		json: "",
		tags: []
	});

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const result = await axios(
    //             'http://localhost:5000/dialetton/europe-west1/api/exercises'
    //         );
            
    //         setData(result.data);
    //     };

    //     fetchData();
    // }, []);

    useEffect(() => {
            const db = firebase.firestore()
            return db.collection("exercises").onSnapshot((snapshot) => {
                const exercisesData = [];
                snapshot.forEach(doc => exercisesData.push(({...doc.data(), exerciseId: doc.id})));
                setExercises(exercisesData);
            });
    },[])

    function deleteHandler(exerciseId) {
        const db = firebase.firestore()
        db.collection("exercises").doc(exerciseId).delete()
    }

    function openCreateWindow() {
        props.cleanExerciseState();
        props.openBuilder();
    }

    function openEditWindow(exerciseId) {
        const fetchData = async () => {
            const db = firebase.firestore();
            const data = await (await db.doc(`/exercises/${exerciseId}`).get()).data()
            props.loadExerciseToState(data,exerciseId);
            props.openBuilder()
        };
        fetchData();
        
    }

    return (
        <div className="app-list">
            <div className="list-header">
                <h1>List</h1>
                <div className="divider-h1" />
            </div>
            
            <div className="table-section">
                <div className="action-bar">
                    <div className="action-left-side">
                        <div className="action-search-bar">
                            <SearchIcon />
                            <input autoComplete="off" type="search" placeholder="Search exercises" className="input-search"></input>
                        </div>
                    </div>
                    <LargeButton value="Create new exercise" onClick={openCreateWindow} />
                </div>
                <table className="table-exercises">
                    <colgroup>
                        <col className="col-title"></col>
                        <col className="col-snippet"></col>
                        <col className="col-tags"></col>
                        <col className="col-actions"></col>
                        <col className="col-more"></col>
                    </colgroup>
                    <thead>
                        <tr className="table-header-row">
                            <th>Title</th>
                            <th>Snippet</th>
                            <th>Tags</th>
                            <th>Actions</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {exercises.map((el) => {
                        return (
                            <tr key={el.exerciseId} className="table-row">
                                <td>{el.title}</td>
                                <td>{el.rawHtml}</td>
                                <td className="table-tags">
                                    {el.tags.map((el,index) => {
                                        return <Chip key={index} label={el} variant="outlined" />
                                    })}
                                </td>
                                <td className="table-action-icons">
                                    <Link to={`/solve/${el.exerciseId}`}>
                                        <Tooltip title="Open" arrow>
                                            <OpenInNewOutlinedIcon />
                                        </Tooltip>
                                    </Link>
                                    <Tooltip title="Edit" arrow>
                                        <EditOutlinedIcon onClick={() => openEditWindow(el.exerciseId)}/>
                                    </Tooltip>
                                    <Tooltip title="Delete" arrow>
                                        <DeleteOutlinedIcon onClick={() => deleteHandler(el.exerciseId)}/>
                                    </Tooltip>
                                </td>
                                <td></td>
                            </tr>
                        )})}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return {
      openBuilder: () => {dispatch(openBuilder())},
      loadExerciseToState: (exercise, exerciseId) => {dispatch(loadExerciseToState(exercise, exerciseId))},
      cleanExerciseState: () => {dispatch(cleanExerciseState())},
    }
  }
 
export default connect(null,mapDispatchToProps)(List);