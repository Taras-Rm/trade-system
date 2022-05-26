import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import GoodBuyForm from "../../../components/GoodBuyForm/GoodBuyForm";
import GoodsItem from "../../../components/GoodsItem/GoodsItem";
import MyModal from "../../../components/MyModal/MyModal";
import Preloader from "../../../components/Preloader/Preloader";
import { validationSchema } from "../GoodAd/utils/validationSchema";
import { buyGoodsStart, getAllGoodsStart } from "./goods-slice";
import "./Goods.scss";

function Goods({ getAllGoods, loading, error, goods, buyGood, loadingBuyGood, errorBuyGood, userId }) {

  useEffect(() => {
    getAllGoods()
  }, []);


     // modal window for buy good form
     const [modalUpd, setModalUpd] = useState(false);


     // selected good ID
     const [goodID, setGoodID] = useState(null);

// data for buy good
const formGoodBuy = useFormik({
  initialValues: {
    toCountry: "",
    toCity: "",
    toStreet: "",
    toPhoneNumber: "",
  },
  validationSchema: validationSchema,
  onSubmit: ({ resetForm }) => {
    buyGoodHandler()
    resetForm();
  },
});

// on edit good button click
const onBuyGoodClick = (goodID) => {
  setGoodID(goodID)
  setModalUpd(true);
};

 // on buy confirm button click //
 const buyGoodHandler = () => {
    let data = formGoodBuy.values
    debugger
    buyGood({...data, goodID: String(goodID)})

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
    <div className="goods">
       <MyModal visible={modalUpd} setVisible={setModalUpd}>
        <h3 className="goods_formHeader">Plese enter delivery address</h3>
        <GoodBuyForm onSubmit={formGoodBuy.handleSubmit} formData={formGoodBuy} />
      </MyModal>
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
