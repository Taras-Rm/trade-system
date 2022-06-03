import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./GoodAd.scss";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import Preloader from "../../../components/Preloader/Preloader";
import noImg from "../../../static/images/no-image.png";
import { buyGoodsStart, getGoodStart } from "../Goods/goods-slice";
import { formatDate } from "../../../common/helpers/formatDate";
import GoodBuyForm from "../../../components/GoodBuyForm/GoodBuyForm";
import MyModal from "../../../components/MyModal/MyModal";
import { useFormik } from "formik";
import { validationSchema } from "./utils/validationSchema";

function GoodAd({
  good,
  ownerData,
  loading,
  loadingUserData,
  getGoodStart,
  currentUserId,
  buyGood,
}) {
  const hist = useHistory();
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    getGoodStart(id);
  }, []);

  // modal window for buy good form
  const [modalUpd, setModalUpd] = useState(false);

  const onBackBtnClick = () => {
    //dispatch(clearGoodInfo());
    hist.goBack();
  };

  // data for buy good
  const formGoodBuy = useFormik({
    initialValues: {
      toCountry: "",
      toCity: "",
      toStreet: "",
      toPhoneNumber: "",
    },
    validationSchema: validationSchema,
    onSubmit: ({ resetForm }) => {
      buyGoodHandler();
      resetForm();
    },
  });

  // on edit good button click
  const onBuyGoodClick = (goodObj) => {
    setModalUpd(true);
  };

  const buyGoodHandler = () => {
    let data = formGoodBuy.values;
    buyGood({ ...data, goodID: id });

    setModalUpd(false);

    hist.goBack();
  };

  if (loading || loadingUserData) {
    return (
      <div style={{ textAlign: "center", marginTop: 200 }}>
        <Preloader />
      </div>
    );
  }

  return (
    <div className="goodAd">
      {/* modal for update */}
      <MyModal visible={modalUpd} setVisible={setModalUpd}>
        <h3 className="goodAd_formHeader">Plese enter delivery address</h3>
        <GoodBuyForm
          onSubmit={formGoodBuy.handleSubmit}
          formData={formGoodBuy}
        />
      </MyModal>
      <button className="goodAd_bck" onClick={onBackBtnClick}>
        <ArrowBackIcon style={{ marginRight: 10 }} /> Back
      </button>
      <div className="goodAd_content">
        <h3 className="goodAd_title">{good.name}</h3>
        <div className="goodAd_content__bottom">
          <div className="goodAd_content__left">
            <div className="goodAd_imgBox">
              <img
                className="goodAd_imgBox__img"
                alt="mainPhoto"
                src={good.image || noImg}
              />
            </div>
          </div>
          <div className="goodAd_content__right">
            <div className="goodAd_content__right__box">
              <div className="goodAd_content__right__contacts">
                <div className="goodAd_content__right-item">
                  <span className="goodAd_content__category">Date:</span>
                  <span className="goodAd_content__value">{`${
                    good.CreatedAt && formatDate(good.CreatedAt)
                  }`}</span>
                </div>
                <div className="goodAd_content__right-item">
                  <span className="goodAd_content__category">Seller:</span>
                  <span className="goodAd_content__value">{`${ownerData.firstName} ${ownerData.lastName}`}</span>
                </div>
                <div className="goodAd_content__right-item">
                  <span className="goodAd_content__category">
                    Phone number:
                  </span>
                  <span className="goodAd_content__value">
                    {ownerData.phone}
                  </span>
                </div>
                <div style={{ marginTop: 30, marginBottom: 20 }}>
                  <span
                    style={{ fontSize: 30 }}
                    className="goodAd_content__category"
                  >
                    Price:
                  </span>
                  <span
                    style={{ fontSize: 30 }}
                    className="goodAd_content__value"
                  >
                    {good.price} $
                  </span>
                </div>
              </div>
              <div className="goodAd_content__description">
                <span
                  style={{ fontSize: 20, marginBottom: 10, fontWeight: "bold" }}
                >
                  Description
                </span>
                <span style={{ fontSize: 15 }}>{good.description}</span>
              </div>
            </div>
            <Button
              variant="contained"
              style={{
                backgroundColor: "green",
                width: "50%",
                height: 50,
                margin: "0 auto",
              }}
              disabled={currentUserId === good.userID}
              onClick={onBuyGoodClick}
            >
              Buy this good
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  good: state.goods.selectedGoodAd,
  loading: state.goods.loadingGoodAd,
  loadingUserData: state.user.loading,

  currentUserId: state.profile.user.id,

  ownerData: state.user.user,
});

const mapDispatchToProps = (dispatch) => ({
  getGoodStart: (goodId) => dispatch(getGoodStart(goodId)),
  buyGood: (goodId) => dispatch(buyGoodsStart(goodId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GoodAd);
