import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import "./MyGoodsSell.scss";
import DeleteIcon from "@mui/icons-material/Delete";
import Preloader from "../../../../components/Preloader/Preloader";
import GoodUpdateForm from "../../../../components/GoodUpdateForm/GoodUpdateForm";
import MyModal from "../../../../components/MyModal/MyModal";
import { useFormik } from "formik";
import { deleteGoodsForSellStart, getGoodsForSellStart, updateGoodsForSellStart } from "../myGoods-slice";
import { connect } from "react-redux";
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

function MyGoodsSell({ getGoods, goods, loading, error, priceSell, deleteGood, updateGood }) {

  // modal window for update form
  const [modalUpd, setModalUpd] = useState(false);

  // data for update
  const formUpd = useFormik({
    initialValues: {
      name: "",
      description: "",
      category: "",
      price: "",
      goodID: null,
    },
  });

  useEffect(() => {
    getGoods()
  }, []);

  const onDeleteGoodClick = (goodId) => {
    deleteGood(goodId)
  };

  // on edit good button click
  const onEditGoodClick = (goodObj) => {
    setModalUpd(true);
    NotificationManager.success('Success message', 'Title here');

    formUpd.setValues({
      name: goodObj.name,
      description: goodObj.description,
      category: goodObj.category,
      price: goodObj.price,
      goodId: goodObj.ID,
    });
  };

   // on edit confirm button click //
   const editHandler = () => {
     let data = formUpd.values
     data.price = parseInt(data.price, 10)
     updateGood(data)

     setModalUpd(false);
  };


  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <Preloader />
      </div>
    );
  }

  return (
    <div className="myGoodsSale">
      {/* modal for update */}
      <MyModal visible={modalUpd} setVisible={setModalUpd}>
        <GoodUpdateForm handler={editHandler} formData={formUpd} />
      </MyModal>
      <h2 className="myGoodsSale_title">My goods for sale</h2>
      <div>
        <Paper className="myGoodsSale_paper">
          <TableContainer sx={{ maxHeight: 400 }}>
            <Table
              stickyHeader
              aria-label="sticky table"
              className="myGoodsSale_table"
            >
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: "bold" }}>Name</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>Category</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>Price $</TableCell>
                  <TableCell style={{ fontWeight: "bold" }} align="center">
                    Edit
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }} align="center">
                    Delete
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {goods.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell width={200} component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell scope="row" component="th">
                      {row.category}
                    </TableCell>
                    <TableCell component="th">{row.price}</TableCell>
                    <TableCell width={100} component="th" align="center">
                      <Button
                        variant="contained"
                        size="small"
                        style={{ backgroundColor: "orange" }}
                        onClick={() => onEditGoodClick(row)}
                      >
                        edit
                      </Button>
                    </TableCell>
                    <TableCell width={100} component="th" align="center">
                      <Button
                        onClick={() => onDeleteGoodClick(row.ID)}
                        variant="contained"
                        size="small"
                        color="error"
                      >
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <div className="myGoodsSale_info">
          <div className="myGoodsSale_info__count">
            Count of goods: {goods.length}
          </div>
          <div className="myGoodsSale_info__price">
            Total price of goods: {priceSell} $
          </div>
        </div>
      </div>

      <NotificationContainer />
    </div>
  );
}

const mapStateToProps = (state) => ({
  goods: state.myGoods.forSellGoods,
  error: state.myGoods.errorSell,
  loading: state.myGoods.loadingSell,
  priceSell: state.myGoods.priceSell
});

const mapDispatchToProps = (dispatch) => ({
  getGoods: () => dispatch(getGoodsForSellStart()),
  deleteGood: (goodId) => dispatch(deleteGoodsForSellStart(goodId)),
  updateGood: (good) => dispatch(updateGoodsForSellStart(good))

});

export default connect(mapStateToProps, mapDispatchToProps)(MyGoodsSell);
