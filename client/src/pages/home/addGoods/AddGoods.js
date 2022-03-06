import React from "react";
import { connect } from "react-redux";
import { addGoodsStart } from "./addGoods-slice";
import "./AddGoods.scss";
import AddGoodsForm from "./addGoodsForm/AddGoodsForm";

function AddGoods({addGoodsStart, error}) {

  let onSubmitForm = (goodObj) => {
    debugger
    addGoodsStart({goodObj});
  };

  return (
    <div className="addGoods">
      <h2 className="addGoods_title">Add goods</h2>
      <AddGoodsForm onSubmitForm={onSubmitForm}/>
    </div>
  );
}

const mapStateToProps = (state) => ({
  error: state.addGoods.error,
});

const mapDispatchToProps = (dispatch) => ({
  addGoodsStart: (formData) => dispatch(addGoodsStart(formData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddGoods);
