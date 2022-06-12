import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
} from "@mui/material";
import "./MyGoodsBuy.scss";
import Preloader from "../../../../components/Preloader/Preloader";
import { connect } from "react-redux";
import { getBuyedGoodsStart } from "../myGoods-slice";
import { formatDate } from "../../../../common/helpers/formatDate";

function MyGoodsBuy({ getBuyedGoods, loading, error, goods, priceBuyed }) {

  useEffect(() => {
    getBuyedGoods()
  }, [getBuyedGoods]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <Preloader />
      </div>
    );
  }

  return (
    <div className="myGoodsBuy">
      <h2 className="myGoodsBuy_title">My buyed goods</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <Paper className="myGoodsSale_paper">
          <TableContainer sx={{ maxHeight: 500 }}>
            <Table
              stickyHeader
              aria-label="sticky table"
              className="myGoodsBuy_table"
            >
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: "bold" }}>Name</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>Category</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>Date</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>Price $</TableCell>
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
                    <TableCell scope="row" component="th">
                      {formatDate(row.UpdatedAt)}
                    </TableCell>
                    <TableCell component="th">{row.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <div className="myGoodsBuy_info">
          <div className="myGoodsBuy_info__count">
            Count of buyed goods: {goods.length}
          </div>
          <div className="myGoodsBuy_info__price">
            Total price of buyed goods: {priceBuyed} $
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  goods: state.myGoods.buyedGoods,
  error: state.myGoods.errorBuyed,
  loading: state.myGoods.loadingBuyed,
  priceBuyed: state.myGoods.priceBuyed
});

const mapDispatchToProps = (dispatch) => ({
  getBuyedGoods: () => dispatch(getBuyedGoodsStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyGoodsBuy);
