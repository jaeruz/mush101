// import { createStore } from "redux";
import firebase from "./api/fbConfig";
import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
// const initialState = {
//   sidebarShow: "responsive",
// };

const authInit = {
  UID: "init",
  authError: false,
};

const changeState = (sidebarShow = "responsive", action) => {
  switch (action.type) {
    case "set":
      return action.payload;
    default:
      return sidebarShow;
  }
};

const authReducer = (authState = authInit, action) => {
  switch (action.type) {
    case "UPDATE_AUTH":
      console.log("updated auth!");
      return { UID: action.UID, authError: null, profile: action.profile };
    case "LOGIN_SUCCESS":
      console.log("Success", action.profile);
      return authState;
    case "LOGIN_ERROR":
      console.log("Error");
      return { UID: null, authError: "login failed!" };
    case "LOGOUT_SUCCESS":
      console.log("logged out!");
      return { UID: null, authError: null };
    case "LOGOUT_ERROR":
      console.log("logged out error!");
      return authState;
    default:
      return authState;
  }
};

const RootStore = combineReducers({
  changeState: changeState,
  firebaseReduc: firebaseReducer,
  auth: authReducer,
});

export default RootStore;

// const store = createStore(changeState);
// export default store;
