import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import "./Registration.scss";
import Img from "./../../static/images/trade-img.png";
import RegisterForm from "./registerForm/RegisterForm";
import { Box } from "@mui/system";
import { Link, Redirect } from "react-router-dom";
import BigCard from "../../components/bigCard/BigCard";
import { connect, useDispatch, useSelector } from "react-redux";
import { getRegistrationStart } from "./registration-slice";

function Registration({registrationStart, isLoad, error}) {

  // надсилання форми
  let onSubmitForm = (newObj) => {
    registrationStart(newObj);
  };

  // перевірка чи користувач зареєструвався
  // if (true) {
  //   return <Redirect to="/login" />;
  // }

  return (
    <div className="registration">
      <div className="leftPart">
        <BigCard
          title="Manage your sales more effectively with TradeSys"
          text="Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica"
          img={Img}
        />
      </div>
      <div className="rightPart">
        <Box sx={{ mb: 5 }}>
          <Typography variant="h4" gutterBottom>
            Get started absolutely free.
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Free forever. No credit card needed.
          </Typography>
        </Box>
        <RegisterForm onSubmitForm={onSubmitForm} />
        <Typography
          variant="body2"
          align="center"
          sx={{ color: "text.secondary", mt: 3 }}
        >
          Already have acount&nbsp;
          <Link to="/login" underline="always" sx={{ color: "text.primary" }}>
            Login
          </Link>
          .
        </Typography>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  error: state.login.error,
  isLoad: state.login.isLoad
});

const mapDispatchToProps = (dispatch) => ({
  registrationStart: (formData) => dispatch(getRegistrationStart(formData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
