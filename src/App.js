import React, { useEffect } from 'react';
import './App.css';
import NavBar from './.Navigation/NavBar';
// import Application from './Application/Application'
import Courses from './.Course/CoursesLanding';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './.Authentication/LoginPage';
import Signup from './.Authentication/SignUpPage';
import CssBaseline from '@material-ui/core/CssBaseline';
import firebase from './.Database/firebase';
import { connect } from 'react-redux';
import { fetchUserData } from './.Store/auth.actions';
import ProtecedRoute from './.Hoc/ProtectedRoute';
import Unauthorized from './.Authentication/LogoutDestinationPage';
import Workspace from './.Application/Workspace';
import * as routes from './.Application/routes';
import FireFunctions from './.Lab/FireFunctions';
import BackendAdmin from './.Lab/DatabaseAdmin';


function App(props) {
  // const [authUser, setAuthUser] = useState(null);
  console.log(process.env);

  useEffect(() => {
    firebase.auth()
    .onAuthStateChanged(user => {
      if (user) props.fetchUserData(user)
    })
  }, [props,props.user]);

  return (
      <BrowserRouter>
      <CssBaseline />
          <div className="app">
            <NavBar />
            <Switch>
              <Route exact path="/"><Redirect to={routes.HOME} /></Route>

              <ProtecedRoute path={routes.HOME} user={props.user} component={Courses} />
              <Route path="/backend" exact component={BackendAdmin} />
              <ProtecedRoute path='/course/:courseId' user={props.user} component={Workspace} />
              
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/lab" exact component={FireFunctions} />
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
