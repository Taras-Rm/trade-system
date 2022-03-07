import React from "react";
import "./AddGoods.scss";
import AddGoodsForm from "./AddGoodsForm/AddGoodsForm";

function AddGoods() {

  let onAddNewGoodClick = (goodObj, image) => {
    // console.log(image);
    // dispatch(addNewGood({ ...goodObj, userID: userID }, image));
    // openSnackbar("Your good is added !");
  };

  return (
    <div className="addGoods">
      <h2 className="addGoods_title">Add goods</h2>
      <AddGoodsForm onAddNewGoodClick={onAddNewGoodClick} />
    </div>
  );
}

export default AddGoods;
