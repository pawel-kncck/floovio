import React, { useState,useEffect, Fragment } from 'react';
import firebase from '../../firebase';
import { connect } from 'react-redux';
import TextField from './TextField';
import DropDown from './DropDown';
import RadioGroup from './RadioGroup';
import { setActiveLessonData,setUser,toggleTeacherMode } from '../../Store/oldActions';
import { hasOwnNestedProperty } from '../../Utilities/Utilities'
import UserDropdown from './UserDropdown';
import { Paper, makeStyles, Box, Button, Typography, FormControlLabel, Switch } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        margin: '10px'
    },
    h1title: {
        marginTop: '20px'
    },
    header: {
        margin: '20px 0',
        display: 'flex'
    },
    title: {
        marginRight: '20px',
        flexGrow: '1'
    },
    exrcContainer: {
        padding: '10px',
        display: 'flex',
        marginTop: '20px'
    },
    exrcContent: {
        flexGrow: '1',
        marginLeft: '20px'
    },
    boxForButton: {
        width: '150px'
    },
    saveButton: {
        height: '55px',
        width: '100%'
    },
})

const Lesson = (props) => {
    const classes = useStyles();
    const [data, setData] = useState({
        author: "",
        users: {},
        json: { child: [] },
        lessonId: ""
    });

    useEffect(() => {
        const fetchData = async () => {
            const db = firebase.firestore();
            const data = await (await db.doc(`/lessons/${props.match.params.lessonId}`).get()).data();
            setData({...data, lessonId: props.match.params.lessonId});
            props.setActiveLessonData({ ...data, lessonId: props.match.params.lessonId });
            authListener();
        };
        fetchData();
    }, [props.match.params.lessonId]);

    function authListener() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log(user.uid)
                props.setUser(user.uid)
            } else {
                console.log("not logged in");
            }
        })
    }

    function updateHandler() {
        const db = firebase.firestore();
        db.collection("lessons").doc(props.activeLessonData.lessonId).update({ 
            users: {
                ...props.activeLessonData.users, 
                [props.user] : props.activeLessonData.users[props.user] 
            }} )
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.error(err);
            })
    }

    const userHasAnswers = () => {
        if (data.users) {
            if (data.users[props.user]) {
                return true
            }
        }
        return false
    }

    

    const componentMap = {
        textfield: TextField,
        dropdown: DropDown,
        radiogroup: RadioGroup
    }

    function renderer(config) {
        const loggedUser = props.user;
        let allProps;
        if (userHasAnswers()) {
            allProps = {
                ...config.attr,
                answers: data.users[loggedUser],
            }
        } else {
            allProps = config.attr
        }

        if (config.node === "text") {
            return config.text
        } else {
            return React.createElement(
                componentMap[config.tag] || config.tag,
                allProps,
                config.child && (typeof config.child === "string"
                    ? config.child
                    : config.child.map(c => renderer(c)))
            );
        }
    }

    return (
        <Fragment>
            <Box className={classes.header}>
                <Typography variant="h1" className={classes.title}>{data.title}</Typography>
                <Box className={classes.boxForButton}>
                    <Button size="large" variant="contained" color="primary" className={classes.saveButton} onClick={updateHandler}>Save</Button>
                </Box>
            </Box>
            <FormControlLabel
                control={
                <Switch
                    checked={props.teacherMode}
                    onChange={props.toggleTeacherMode}
                    name="checkedB"
                    color="primary"
                />
                }
                label="Teacher mode"
            />
            {data.json.child.map((el,index) => {
                return (
                <Paper key={index} elevation={3} className={classes.exrcContainer}>
                    <div className={classes.exrcContent}>
                        {renderer(el)}
                    </div>
                </Paper>)
            })}
            
            <pre>
                <code>
                    {(userHasAnswers()) ? JSON.stringify(props.activeLessonData.users[props.user],null,'\t') : ""}
                </code>
            </pre>
        </Fragment>
    );
}

const mapStateToProps = state => {
    return{
        user: state.oldReducer.loggedUser,
        activeLessonData: state.oldReducer.activeLessonData,
        teacherMode: state.oldReducer.checking_mode,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setActiveLessonData: (data) => {dispatch(setActiveLessonData(data))},
        setUser: (user) => {dispatch(setUser(user))}, 
        toggleTeacherMode: () => {dispatch(toggleTeacherMode())}
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(Lesson);