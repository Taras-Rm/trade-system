import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./GoodAd.scss";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Preloader from "../../../components/Preloader/Preloader";
import noImg from "../../../static/images/no-image.png";

function GoodAd() {
  const hist = useHistory();
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    //dispatch(getGoodInfo(id));
  }, []);

  const onBackBtnClick = () => {
    //dispatch(clearGoodInfo());
    hist.goBack();
  };

  const onBuyBtnClick = (e) => {
    // e.preventDefault();
    // dispatch(
    //   buyGood({
    //     name: good.name,
    //     category: good.category,
    //     description: good.description,
    //     id: id,
    //     imageURL: good.imageURL,
    //     price: good.price,
    //     userID: good.userID,
    //     customerID: authUserID,
    //   })
    // );

    // openSnackbar("You buy this good !");
    // hist.goBack();
  };

  // if (!good) {
  //   return (
  //     <div style={{ textAlign: "center", marginTop: 50 }}>
  //       <Preloader />
  //     </div>
  //   );
  // }

  return (
    <div className="goodAd">
      <button className="goodAd_bck" >
        <ArrowBackIcon style={{ marginRight: 10 }} /> Back
      </button>
      <div className="goodAd_content">
        <h3 className="goodAd_title">{"kkcd"}</h3>
        <div className="goodAd_content__bottom">
          <div className="goodAd_content__left">
            <div className="goodAd_imgBox">
              <img
                className="goodAd_imgBox__img"
                alt="mainPhoto"
                // src={good.imageURL || noImg}
              />
            </div>
          </div>
          <div className="goodAd_content__right">
            <div>
              <div className="goodAd_content__right-item">
                <span className="goodAd_content__category">Seller:</span>
                <span className="goodAd_content__value">{"fdvf"}</span>
              </div>
              <div className="goodAd_content__right-item">
                <span className="goodAd_content__category">Phone number:</span>
                <span className="goodAd_content__value">
                  {"55565"}
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
                  {"78"} $
                </span>
              </div>
              <div className="goodAd_content__description">
                <span
                  style={{ fontSize: 20, marginBottom: 10, fontWeight: "bold" }}
                >
                  Description
                </span>
                <span style={{ fontSize: 15 }}>{"sdx"}</span>
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
              // disabled={authUserID === good.userID}
              // onClick={onBuyBtnClick}
            >
              Buy this good
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GoodAd;
