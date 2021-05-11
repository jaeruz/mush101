import React, { Component, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./scss/style.scss";
import firebase from "./api/fbConfig";
import { updateAuth } from "./Actions";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));

// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));
const Register = React.lazy(() => import("./views/pages/register/Register"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));

const App = () => {
  const authFirebase = useSelector((state) => state.firebaseReduc);
  const authDetails = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user !== null) {
        dispatch(updateAuth(user.uid));
      } else {
        dispatch(updateAuth(null));
      }
    });
  }, []);

  useEffect(() => {
    console.log("authdetails", authDetails);
  }, [authDetails]);

  useEffect(() => {
    console.log(authFirebase);
  }, [authFirebase]);
  return (
    <BrowserRouter>
      <React.Suspense fallback={loading}>
        <div className="body-ui">
          <Switch>
            <Route
              exact
              path="/login"
              name="Login Page"
              render={
                authDetails.UID
                  ? (props) => <TheLayout {...props} />
                  : (props) => <Login {...props} />
              }
            />
            <Route
              exact
              path="/register"
              name="Register Page"
              render={
                authDetails.UID
                  ? (props) => <TheLayout {...props} />
                  : (props) => <Register {...props} />
              }
            />
            <Route
              exact
              path="/404"
              name="Page 404"
              render={(props) => <Page404 {...props} />}
            />
            <Route
              exact
              path="/500"
              name="Page 500"
              render={(props) => <Page500 {...props} />}
            />
            <Route
              path="/"
              name="Home"
              render={(props) => <TheLayout {...props} />}
            />
          </Switch>
        </div>
      </React.Suspense>
    </BrowserRouter>
  );
};

export default App;
