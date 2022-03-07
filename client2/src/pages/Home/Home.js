import React, { useEffect } from "react";
import Header from "../../components/Header/Header";
import "./Home.scss";
import Sidebar from "./Sidebar/Sidebar";
import { Route, Switch } from "react-router-dom";
import Goods from "./Goods/Goods";
import AddGoods from "./AddGoods/AddGoods";
import MyGoodsSell from "./MyGoods/MyGoodsSell/MyGoodsSell";
import MyGoodsBuy from "./MyGoods/MyGoodsBuy/MyGoodsBuy";
import Profile from "./Profile/Profile";
import GoodAd from "./GoodAd/GoodAd";
import { connect } from "react-redux";
import { getProfileStart } from "./Profile/profile-slice";

function Home({ getProfileStart, loading, error, user }) {

  useEffect(() => {
    getProfileStart()
  }, [])

  return (
    <div className="home">
      <Sidebar fullName={`${user.firstName} ${user.lastName}`} avatarLetter={user.firstName[0].toUpperCase()} loading={loading}/>
      <div className="home_main">
        <Header />
        <Switch>
          <Route exact path="/home/profile">
            <Profile />
          </Route>
          <Route exact path="/home/goods">
            <Goods />
          </Route>
          <Route exact path="/home/goods/ad/:id">
            <GoodAd />
          </Route>
          <Route exact path="/home/addGoods">
            <AddGoods />
          </Route>
          <Route exact path="/home/sellGoods">
            <MyGoodsSell />
          </Route>
          <Route exact path="/home/purchaseGoods">
            <MyGoodsBuy />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  loading: state.profile.loading,
  error: state.profile.error,
  user: state.profile.user
});

const mapDispatchToProps = (dispatch) => ({
  getProfileStart: () => dispatch(getProfileStart()),
});


export default connect(mapStateToProps, mapDispatchToProps)(Home);
