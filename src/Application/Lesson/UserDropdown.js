import React from 'react';
import { connect } from 'react-redux';
import { setUser } from '../../Store/oldActions';

const UserDropdown = (props) => {
    console.log(Object.keys(props.userArray));
    return (
        <select>
            {Object.keys(props.userArray).map((el,index) => {
                return <option key={index}>{el}</option>
            })}
        </select>
    );
}

const mapStateToProps = (state,ownProps) => {
    return{
        user: state.loggedUser,
        activeLessonData: state.activeLessonData,
        userArray: Object.keys(state.activeLessonData.users),
        // id: ownProps.id
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setUser: (user) => {dispatch(setUser(user))}, 
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(UserDropdown);