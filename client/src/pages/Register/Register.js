import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import "./Register.scss";
import Img from "../../static/images/trade-img.png";
import RegisterForm from "./RegisterForm/RegisterForm";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import BigCard from "../../components/BigCard/BigCard";
import { connect } from "react-redux";
import {
  getRegistrationStart,
  stopHaveErrorAndSuccess,
} from "./registration-slice";
import { useHistory } from "react-router-dom";

function Register({
  registrationStart,
  error,
  isLoad,
  isSuccess,
  stopHaveErrorAndSuccess,
}) {
  const history = useHistory();

  let onSubmitForm = (formObj) => {
    registrationStart(formObj);
  };

  useEffect(() => {
    if (isSuccess) {
      history.push("/login");
    }

    return stopHaveErrorAndSuccess();
  }, [history, isSuccess, stopHaveErrorAndSuccess]);

  return (
    <div className="registration">
      <div className="leftPart">
        <BigCard
          title="Manage your sales more effectively with TradeSystem"
          text="
          On this platform you can sell your products. You can also buy the necessary goods and track incomes and expenses."
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
        {error && <div className="rightPart__error">{error}</div>}

        <Typography
          variant="body2"
          align="center"
          sx={{ color: "text.secondary", mt: 3 }}
        >
          Already have acount&nbsp;
          <Link to="/login" underline="always" sx={{ color: "text.primary" }}>
            Login
          </Link>
        </Typography>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  error: state.registration.error,
  isLoad: state.registration.isLoad,

  isSuccess: state.registration.isSuccess,
});

const mapDispatchToProps = (dispatch) => ({
  registrationStart: (formData) => dispatch(getRegistrationStart(formData)),

  stopHaveErrorAndSuccess: () => dispatch(stopHaveErrorAndSuccess()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
