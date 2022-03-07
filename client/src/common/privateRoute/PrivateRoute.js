import { connect } from "react-redux"
import { Redirect, Route } from "react-router-dom"

const PrivateRouteComponent = ({ children, isAuth, ...rest }) => {
    return (
      <Route { ...rest } render={ ({ location }) => (
        isAuth ? children : <Redirect to={ { pathname: '/login', state: { from: location } } } />) }
      />
    )
  }
  

export const PrivateRoute = connect((state)=>({ isAuth: state.profile.auth }))(PrivateRouteComponent)
  