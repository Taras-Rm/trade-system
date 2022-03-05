import { Box } from "@material-ui/core";
import React from "react";
import "./Login.scss";
import LoginForm from "./loginForm/LoginForm";

import Typography from "@mui/material/Typography";
import Img from "./../../static/images/trade-img.png";
import { Link, Redirect } from "react-router-dom";
import BigCard from "../../components/bigCard/BigCard";
import { connect } from "react-redux";
import { getLoginStart } from "./login-slice";

function Login({loginStart, isAuth, error}) {

  let onSubmitForm = (regObj) => {
    loginStart({regObj});
  };

  if (isAuth) {
    return <Redirect to="/home" />;
  }

  return (
    <div className="login">
      <div className="login_leftPart">
        <BigCard
          title="Hi, Welcome back !"
          text="Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica"
          img={Img}
        />
      </div>
      <div className="login_rightPart">
        <Box sx={{ mb: 5 }}>
          <Typography variant="h4" gutterBottom>
            Sign in
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Enter your details below.
          </Typography>
        </Box>
        <LoginForm onSubmitForm={onSubmitForm} />
        <Typography
          variant="body2"
          align="center"
          sx={{ color: "text.secondary", mt: 3 }}
        >
          Have not acount&nbsp;
          <Link
            to="/registration"
            underline="always"
            sx={{ color: "text.primary" }}
          >
            Registration
          </Link>
          .
        </Typography>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuth: !!state.profile.auth,
  error: state.login.error,
  isLoad: state.login.isLoad
});

const mapDispatchToProps = (dispatch) => ({
  loginStart: (formData) => dispatch(getLoginStart(formData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);


