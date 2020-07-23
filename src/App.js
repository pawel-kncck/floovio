import React, { useEffect } from 'react';
import './App.css';
import NavBar from './.Navigation/NavBar';
// import Application from './Application/Application'
import Courses from './.Course/CoursesLanding';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './.Authentication/LoginPage';
import CssBaseline from '@material-ui/core/CssBaseline';
import firebase from './.Database/firebase';
import { connect } from 'react-redux';
import { fetchUserData } from './.Store/auth.actions';
import ProtecedRoute from './.Hoc/ProtectedRoute';
import Unauthorized from './.Authentication/LogoutDestinationPage';
import Workspace from './.Application/Workspace';
import * as routes from './.Application/routes';


function App(props) {
  // const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    firebase.auth()
    .onAuthStateChanged(user => {
      props.fetchUserData(user)
    })
  }, [props,props.user]);

  return (
      <BrowserRouter>
      <CssBaseline />
          <div className="app">
            <NavBar />
            <Switch>
              <Route path={routes.HOME} exact component={Courses} />
              <Route path="/login" component={Login} />
              <ProtecedRoute path='/course' user={props.user} component={Workspace} />
              {/* <Route path='/course' component={Workspace} /> */}
              <Route path="/unauthorized" component={Unauthorized} />
            </Switch>
          </div>
      </BrowserRouter>
  );
}

const mapStateToProps = state => {
  return {
    user: state.auth.userUid,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchUserData: (user) => dispatch(fetchUserData(user)),
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(App);
