import React from "react";
import "./AddGoods.scss";
import AddGoodsForm from "./addGoodsForm/AddGoodsForm";

function AddGoods() {
  return (
    <div className="addGoods">
      <h2 className="addGoods_title">Add goods</h2>
      <AddGoodsForm />
    </div>
  );
}

export default AddGoods;
