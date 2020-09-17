import firebase from '../.Database/firebase';
import { getUser } from '../.Database/db.auth';
/*
* action types
*/ 

export const LOGIN_START = 'LOGIN_START'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'
export const LOGOUT_START = 'LOGOUT_START'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAIL = 'LOGOUT_FAIL'
export const SET_USER = 'SET_USER'
export const FETCH_USER_START = 'FETCH_USER_START'
export const FETCH_USER_FAIL = 'FETCH_USER_FAIL'
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS'
export const CLEAN_AUTH_STATE = 'CLEAN_AUTH_STATE'


/*
 * action creators
 */

export const loginStart = () => {
  return { type: LOGIN_START }
}

export const loginSuccess = (loginData) => {
    return {
        type: LOGIN_SUCCESS,
        loginData: loginData
    };
};

export const loginFail = (error) => {
    return {
        type: LOGIN_FAIL,
        error: error
    };
};

export const login = (email, password) => {
    return dispatch => {
        dispatch(loginStart());
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(res => {
                dispatch(loginSuccess(res.data));
            })
            .catch(err => {
                console.log(err);
                dispatch(loginFail(err));
            })
    };
};

export const logoutStart = () => {
    return { type: LOGOUT_START }
};

export const logoutSuccess = () => {
    return {
        type: LOGOUT_SUCCESS,
    };
};

export const logoutFail = (error) => {
    return {
        type: LOGOUT_FAIL,
        error: error
    };
};

export const logout = () => {
    return dispatch => {
        dispatch(logoutStart());
        firebase.auth().signOut()
            .then(() => {
                dispatch(logoutSuccess());
            })
            .catch(err => {
                console.log(err);
                dispatch(logoutFail(err));
            })
    };
};

export const setUser = (user) => {
    let userObject;
    if (user) {
        userObject = {
            user: user,
            id: user.uid,
            email: user.email,
        }
    } else {
        userObject = {
            user: null,
            id: null,
            email: null,
        }
    };

    return {
        type: SET_USER,
        ...userObject
    };
};

export const fetchUserStart = () => {return { type: FETCH_USER_START }};

export const fetchUserSuccess = (userData,userUid) => {
    return {
        type: FETCH_USER_SUCCESS,
        uid: userUid,
        data: userData
    }
}

export const fetchUserFail = error => {
    return {
        type: FETCH_USER_FAIL,
        error: error
    }
}

export const fetchUserData = (user) => {
    return dispatch => {
        dispatch(fetchUserStart);
        return getUser(user.uid)
            .then(res => {
                dispatch(fetchUserSuccess(res.data(), user.uid));
                return res;
            })
            .catch(error => {
                dispatch(fetchUserFail(error));
            })
    }
}


export const cleanAuthState = () => {return { type: CLEAN_AUTH_STATE }};