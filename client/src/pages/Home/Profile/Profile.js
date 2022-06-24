import { Button } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import MyModal from "../../../components/MyModal/MyModal";
import Preloader from "../../../components/Preloader/Preloader";
import UserUpdateForm from "../../../components/UserUpdateForm/UserUpdateForm";
import {
  getBuyedGoodsStart,
  getProfileStart,
  getSoldGoodsStart,
  topUpAmountStart,
  updateProfileStart,
} from "./profile-slice";
import "./Profile.scss";
import TradeInfo from "./TradeInfo/TradeInfo";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import MoneyAmount from "./MoneyAmount/MoneyAmount";
import { validationSchema } from "../../../components/UserUpdateForm/utils/validationSchema";

function Profile({
  user,
  error,
  loadingProfile,
  getProfileStart,
  updateProfileStart,
  buyedGoods,
  getBuyedGoods,
  buyedGoodsPrice,
  getSoldGoods,
  soldGoods,
  soldGoodsPrice,
  topUpAmount
}) {
  const [modalUpd, setModalUpd] = useState(false);

  const editHandler = (e) => {
    let data = formUpd.values;
    updateProfileStart(data);

    setModalUpd(false);

    setTimeout(() => {
      NotificationManager.success(
        "Success information update",
        "Update user information",
        1000
      );
    }, 1000);
  };

  const formUpd = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      age: "",
      phone: "",
    },
    validationSchema: validationSchema,
    onSubmit: ({ resetForm }) => {
      editHandler();
      resetForm();
    },
  });
  ///

  const onEditInfoClick = () => {
    setModalUpd(true);
    formUpd.setValues({
      firstName: user.firstName,
      lastName: user.lastName,
      age: user.age,
      phone: user.phone,
    });
  };

  

  useEffect(() => {
    getProfileStart();
    getBuyedGoods();
    getSoldGoods();
  }, [user.id, getProfileStart, getBuyedGoods, getSoldGoods]);

  return (
    <div className="profilePage">
      <NotificationContainer />

      <h2 className="profilePage_title">All profile information</h2>
      {loadingProfile ? (
        <div style={{ textAlign: "center", marginTop: 50 }}>
          <Preloader />
        </div>
      ) : (
        <>
          <div className="profilePage_top">
            <div className="profilePage_info">
              <h2 className="profilePage_info__title">
                Information about user
              </h2>
              <div className="profilePage_info__box">
                <div className="profilePage_info__item">
                  <span className="profilePage_info__itemName">
                    First name:
                  </span>
                  <span className="profilePage_info__itemValue">
                    {user.firstName}
                  </span>
                </div>
                <div className="profilePage_info__item">
                  <span className="profilePage_info__itemName">Last name:</span>
                  <span className="profilePage_info__itemValue">
                    {user.lastName}
                  </span>
                </div>
                <div className="profilePage_info__item">
                  <span className="profilePage_info__itemName">Age:</span>
                  <span className="profilePage_info__itemValue">
                    {user.age}
                  </span>
                </div>
                <div className="profilePage_info__item phone">
                  <span className="profilePage_info__itemName">Phone:</span>
                  <span className="profilePage_info__itemValue">
                    {user.phone}
                  </span>
                </div>
              </div>
              <Button
                onClick={() => onEditInfoClick()}
                variant="contained"
                size="large"
                style={{
                  backgroundColor: "orange",
                  width: "50%",
                  margin: "0 auto",
                }}
              >
                Update information
              </Button>
            </div>

            <MoneyAmount topUpAmount={topUpAmount} moneyAmount={user.amount} />
          </div>

          <div className="profilePage_infoTrade">
            <h2 className="profilePage_infoTrade__title">
              Information about user trades
            </h2>
            <TradeInfo
              totalBuyedPrice={buyedGoodsPrice}
              totalSelledPrice={soldGoodsPrice}
              totalSelledCount={soldGoods.length}
              totalBuyedCount={buyedGoods.length}
            />
          </div>
        </>
      )}
      <MyModal visible={modalUpd} setVisible={setModalUpd}>
        <UserUpdateForm onSubmit={formUpd.handleSubmit} formData={formUpd} />
      </MyModal>
    </div>
  );
}

const mapStateToProps = (state) => ({
  loadingProfile: state.profile.loading,
  error: state.profile.error,
  user: state.profile.user,

  buyedGoods: state.profile.buyedGoods,
  buyedGoodsPrice: state.profile.buyedGoodsPrice,
  soldGoods: state.profile.soldGoods,
  soldGoodsPrice: state.profile.soldGoodsPrice,
});

const mapDispatchToProps = (dispatch) => ({
  getProfileStart: () => dispatch(getProfileStart()),
  updateProfileStart: (data) => dispatch(updateProfileStart(data)),

  getBuyedGoods: () => dispatch(getBuyedGoodsStart()),
  getSoldGoods: () => dispatch(getSoldGoodsStart()),

  topUpAmount: (data) => dispatch(topUpAmountStart(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
