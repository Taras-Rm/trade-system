import React, { useEffect } from "react";
import GoodsItem from "../../../components/goodsItem/GoodsItem";
import { connect, useDispatch, useSelector } from "react-redux";
import "./Goods.scss";
import { getAllGoodsStart } from "./goods-slice";

function Goods({ getAllGoods, error, loading, goods }) {

  useEffect(() => {
    getAllGoods();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="goods">
      <h2 className="goods_title">Goods</h2>
      <div className="goods_box">
        {goods.map((item) => (
          <GoodsItem name={item.name} price={item.price} />
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  goods: state.allGoods.goods,
  error: state.allGoods.error,
  loading: state.allGoods.loading,
})

const mapDispatchToProps = (dispatch) => ({
  getAllGoods: () => dispatch(getAllGoodsStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Goods);
