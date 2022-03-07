import { Button } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import MyModal from "../../../components/MyModal/MyModal";
import UserUpdateForm from "../../../components/UserUpdateForm/UserUpdateForm";
import "./Profile.scss";
import TradeInfo from "./TradeInfo/TradeInfo";

function Profile() {

  ///
  // модальне вікно оновлення
  const [modalUpd, setModalUpd] = useState(false);
  // дані форми оновлення
  // зміни в інпутах форми оновлення
  const formUpd = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      age: "",
      phone: "",
    },
    //validationSchema: validationSchema,
  });
  ///

  const onEditInfoClick = () => {
    setModalUpd(true);
    formUpd.setValues({
      //firstName: user.firstName,
      //lastName: user.lastName,
      //age: user.age,
      //phone: user.phone,
    });
  };

  const editHandler = (e) => {
    // e.preventDefault();
    // if (
    //   isNaN(formUpd.values.age) ||
    //   formUpd.values.firstName === "" ||
    //   formUpd.values.lastName === "" ||
    //   formUpd.values.phone === ""
    // ) {
    //   openSnackbar2("Bad form data !");
    // } else {
    //   dispatch(
    //     updateUser(
    //       {
    //         firstName: formUpd.values.firstName,
    //         lastName: formUpd.values.lastName,
    //         age: formUpd.values.age,
    //         phone: formUpd.values.phone,
    //       },
    //       user.id
    //     )
    //   );
    //   setModalUpd(false);
    //   openSnackbar("Your profile is updated !");
    // }
  };

  // useEffect(() => {
  //   dispatch(getAllSelledGoods(user.id));
  //   dispatch(getAllBuyedGoods(user.id));
  // }, [dispatch, user.id]);

  // if (isLoading) {
  //   return (
  //     <div style={{ textAlign: "center", marginTop: 50 }}>
  //       <Preloader />
  //     </div>
  //   );
  // }

  return (
    <div className="profilePage">
      <h2 className="profilePage_title">All profile information</h2>

      <div className="profilePage_info">
        <h2 className="profilePage_info__title">Information about user</h2>

        <div className="profilePage_info__box">
          <div className="profilePage_info__item">
            <span className="profilePage_info__itemName">First name:</span>
            <span className="profilePage_info__itemValue">
              {4455}
            </span>
          </div>
          <div className="profilePage_info__item">
            <span className="profilePage_info__itemName">Last name:</span>
            <span className="profilePage_info__itemValue">{"dfvfdv"}</span>
          </div>
          <div className="profilePage_info__item">
            <span className="profilePage_info__itemName">Age:</span>
            <span className="profilePage_info__itemValue">{"dfvfdv"}</span>
          </div>
          <div className="profilePage_info__item">
            <span className="profilePage_info__itemName">Phone:</span>
            <span className="profilePage_info__itemValue">{"dfvfdv"}</span>
          </div>
        </div>
        <Button
          // onClick={() => onEditInfoClick()}
          variant="contained"
          size="small"
          style={{ backgroundColor: "orange", width: "50%", margin: "0 auto" }}
        >
          Update information
        </Button>
      </div>

      <div className="profilePage_infoTrade">
        <h2 className="profilePage_infoTrade__title">
          Information about user trades
        </h2>
        <TradeInfo
          totalBuyedPrice={5}
          totalSelledPrice={5}
          totalSelledCount={4}
          totalBuyedCount={4}
        />
      </div>
      <MyModal visible={modalUpd} setVisible={setModalUpd}>
        <UserUpdateForm handler={editHandler} formData={formUpd} />
      </MyModal>
    </div>
  );
}

export default Profile;
