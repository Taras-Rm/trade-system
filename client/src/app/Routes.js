import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ProtectedRoute from "../components/protectedRoute/ProtectedRoute";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Registration from "../pages/registration/Registration";
import Title from "../pages/title/Title";

function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Title />
      </Route>
      <Route exact path="/registration">
        <Registration />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <ProtectedRoute path="/home">
        {/* <Home /> */} Authorized !!!
      </ProtectedRoute>
      <Redirect to="/" />
    </Switch>
  );
}

export default Routes;
