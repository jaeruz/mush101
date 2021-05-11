import firebase from "./api/fbConfig";

export const updateSidebar = (val) => async (dispatch) => {
  dispatch({ type: "set", payload: val });
};

export const signUP = (regForm) => async (dispatch) => {
  await firebase
    .auth()
    .createUserWithEmailAndPassword(regForm.email, regForm.password)
    .then((user) => {
      // console.log(user);
      const users = firebase.database().ref("users/registered");
      users.child(user.user.uid).set({
        ...regForm,
        id: user.user.uid,
        createdAt: user.user.metadata.creationTime,
      });
    })
    .catch((err) => {
      console.log("ERROR creating user", err);
    });
};

export const signIn = (credentials) => async (dispatch) => {
  // const firebase = getFirebase();

  await firebase
    .auth()
    .signInWithEmailAndPassword(credentials.email, credentials.password)
    .then(() => {
      dispatch({ type: "LOGIN_SUCCESS" });
    })
    .catch((err) => {
      dispatch({ type: "LOGIN_ERROR", err });
    });
};

export const updateAuth = (UID) => async (dispatch) => {
  const users = firebase.database().ref("users/registered");
  users.on("value", async (snapshot) => {
    // console.log(snapshot.val()[UID])
    dispatch({ type: "UPDATE_AUTH", UID, profile: snapshot.val()[UID] });
  });
};

export const logOut = () => async (dispatch) => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      dispatch({ type: "LOGOUT_SUCCESS" });
    })
    .catch((err) => {
      dispatch({ type: "LOGOUT_ERROR" });
    });
};
