import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { getLoginStartByTokens } from '../../pages/Login/login-slice';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants/constants';
import { getItemFromLocalStorage } from '../helpers/getItemFromLocalStorage';

export const requireAuth = (Component) => {

  const AppAuthWpapper = ({ isAuth, loginStart }) => {

    useEffect(() => {
      if (!isAuth) {
        const tokensData = {
          AccessToken: getItemFromLocalStorage(ACCESS_TOKEN),
          RefreshToken: getItemFromLocalStorage(REFRESH_TOKEN)
        }

        if (tokensData.AccessToken && tokensData.RefreshToken) {
          loginStart(tokensData)
        }
      }
    }, [loginStart])

    return <Component />
  }

  const mapStateToProps = (state) => ({
    isAuth: !!state.profile.auth,
  });

  const mapDispatchToProps = (dispatch) => ({
    loginStart: (formData) => dispatch(getLoginStartByTokens(formData))
  });

  return connect(mapStateToProps, mapDispatchToProps)(AppAuthWpapper)
}
