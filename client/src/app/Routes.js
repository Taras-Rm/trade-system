import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { PrivateRoute } from "../common/privateRoute/PrivateRoute";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Registration from "../pages/Register/Register";
import Title from "../pages/Title/Title";

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
      <PrivateRoute path="/home">
        <Home />
      </PrivateRoute>
      <Redirect to="/" />
    </Switch>
  );
}

export default Routes;
