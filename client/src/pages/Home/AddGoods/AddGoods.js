import React from "react";
import { connect } from "react-redux";
import { addGoodsStart } from "./addGoods-slice";
import "./AddGoods.scss";
import AddGoodsForm from "./AddGoodsForm/AddGoodsForm";
import {NotificationContainer, NotificationManager} from 'react-notifications';

function AddGoods({ addGoods, loading, error }) {

  let onAddNewGoodClick = (goodObj) => {
    addGoods({ ...goodObj });

    setTimeout(() => {
      NotificationManager.success('Ad is successfully created', 'Ad creation');
    }, 500)
  };

  return (
    <div className="addGoods">
      <h2 className="addGoods_title">Add goods</h2>
      <AddGoodsForm onAddNewGoodClick={onAddNewGoodClick} />
      <NotificationContainer />
    </div>
  );
}

const mapStateToProps = (state) => ({
  loading: state.addGoods.loading,
  error: state.addGoods.error,
});

const mapDispatchToProps = (dispatch) => ({
  addGoods: (good) => dispatch(addGoodsStart(good)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddGoods);