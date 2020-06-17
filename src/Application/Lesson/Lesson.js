import React, { useState,useEffect } from 'react';
import firebase from '../../firebase';
import { connect } from 'react-redux';
import TextField from './TextField';
import DropDown from './DropDown';
import RadioGroup from './RadioGroup';
import { setActiveLessonData,setUser } from '../../Store/oldActions';
import { hasOwnNestedProperty } from '../../Utilities/Utilities'
import UserDropdown from './UserDropdown';

const Lesson = (props) => {
    const [data, setData] = useState({
        author: "",
        users: {},
        json: {},
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
        if (props.activeLessonData.users) {
            if (props.activeLessonData.users[props.user]) {
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
        <div>
            {(data.lessonId !== "") ? renderer(data.json) : null}
            {/* <div>
                {(data.lessonId !== "") ? React.createElement('div',null,data.users[props.user].test) : null}
            </div> */}
            <button onClick={updateHandler}>SAVE</button>
            { (userHasAnswers(props.user)) ? "User has answers" : "No answers" }
            <pre>
                <code>
                    {(userHasAnswers()) ? JSON.stringify(props.activeLessonData.users[props.user],null,'\t') : ""}
                </code>
            </pre>
        </div>
    );
}

const mapStateToProps = state => {
    return{
        user: state.loggedUser,
        activeLessonData: state.activeLessonData
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setActiveLessonData: (data) => {dispatch(setActiveLessonData(data))},
        setUser: (user) => {dispatch(setUser(user))}, 
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(Lesson);