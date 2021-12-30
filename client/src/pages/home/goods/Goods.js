import React, { useEffect } from "react";
import GoodsItem from "../../../components/goodsItem/GoodsItem";
import { useDispatch, useSelector } from "react-redux";
import "./Goods.scss";
import { getAllGoods } from "../../../store/goodsReducer";

function Goods() {
  const dispatch = useDispatch();
  let goods = useSelector((state) => state.goodsReducer.goods);
  let user = useSelector((state) => state.homeReducer.user);
  let isLoading = useSelector((state) => state.goodsReducer.isLoading);

  useEffect(() => {
    dispatch(getAllGoods(user.ID));
  }, []);

  if (isLoading) {
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

export default Goods;
