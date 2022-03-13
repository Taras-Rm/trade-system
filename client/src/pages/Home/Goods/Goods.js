import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import GoodsItem from "../../../components/GoodsItem/GoodsItem";
import Preloader from "../../../components/Preloader/Preloader";
import { buyGoodsStart, getAllGoodsStart } from "./goods-slice";
import "./Goods.scss";

function Goods({ getAllGoods, loading, error, goods, buyGood, loadingBuyGood, errorBuyGood, userId }) {

  useEffect(() => {
    getAllGoods()
  }, []);

  const onBuyGoodClick = (goodId) => {
    buyGood(goodId)
  }

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
              key={item.ID}
              good={item}
              onBuyGoodClick={onBuyGoodClick}
              userId={userId}
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
  goods: state.goods.goods,

  userId: state.profile.user.id,

  loadingBuyGood: state.goods.loadingBuyGood,
  errorBuyGood: state.goods.errorBuyGood
});

const mapDispatchToProps = (dispatch) => ({
  getAllGoods: () => dispatch(getAllGoodsStart()),
  buyGood: (goodId) => dispatch(buyGoodsStart(goodId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Goods);
