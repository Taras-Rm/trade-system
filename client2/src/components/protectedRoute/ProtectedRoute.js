import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";

function ProtectedRoute({ children, path }) {
  const auth = useSelector((state) => state.profile.auth);

  if (!auth) return <Redirect to="/login" />;

  return <Route path={path}>{children}</Route>;
}

export default ProtectedRoute;
