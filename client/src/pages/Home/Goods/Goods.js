import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import GoodsItem from "../../../components/GoodsItem/GoodsItem";
import Preloader from "../../../components/Preloader/Preloader";
import { getAllGoodsStart } from "./goods-slice";
import "./Goods.scss";

function Goods({ getAllGoods, loading, error, goods }) {

  useEffect(() => {
    getAllGoods()
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <Preloader />
      </div>
    );
  }
  
  return (
    <div className="goods">
      <h2 className="goods_title">Goods</h2>
      {!goods.length ? (
        <div className="goods_noGoods">
          While we haven`t goods on our trade :(
        </div>
      ) : (
        <div className="goods_box">
          {goods.map((item) => (
            <GoodsItem
              key={item.id}
              userID={item.userID}
              name={item.name}
              price={item.price}
              img={item.imageURL}
              good={item}
              // onBuyGoodClick={onBuyGoodClick}
              // authUserID={authUserID}
            />
          ))}
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  loading: state.goods.loading,
  error: state.goods.error,
  goods: state.goods.goods
});

const mapDispatchToProps = (dispatch) => ({
  getAllGoods: () => dispatch(getAllGoodsStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Goods);
