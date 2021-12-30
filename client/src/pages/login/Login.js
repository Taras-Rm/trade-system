import { Box } from "@material-ui/core";
import React from "react";
import "./Login.scss";
import LoginForm from "./loginForm/LoginForm";

import Typography from "@mui/material/Typography";
import Img from "./../../static/images/trade-img.png";
import { Link, Redirect } from "react-router-dom";
import BigCard from "../../components/bigCard/BigCard";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/loginReducer";

function Login() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.loginReducer.isAuthLogin);

  // надсилання даних форми логування
  let onSubmitForm = (regObj) => {
    dispatch(login(regObj));
  };

  // перенапрвлення залогованого користувача на головну сторінку
  if (isAuth) {
    return <Redirect to="/home/profile" />;
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

export default Login;
