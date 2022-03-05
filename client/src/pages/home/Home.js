import React, { useEffect } from "react";
import Header from "../../components/header/Header";
import "./Home.scss";
import Sidebar from "./sidebar/Sidebar";
import { Route, Switch } from "react-router";
import Profile from "./profile/Profile";
import Goods from "./goods/Goods";
import AddGoods from "./addGoods/AddGoods";
import { getProfileStart } from "./profile/profile-slice";
import { connect } from "react-redux";

function Home({getProfileStart}) {

  useEffect(() => {
    getProfileStart()
  }, [])
 
  // // перевірка чи профіль користувача завантажився
  // if (!isLoading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="home">
      <Sidebar
        // fullName={`${user.firstName} ${user.lastName}`}
        // avatarLetter={user.firstName[0]}
      />
      <div className="home_main">
        <Header />
        <Switch>
          <Route exact path="/home/profile">
            <Profile />
          </Route>
          <Route exact path="/home/goods">
            <Goods />
          </Route>
          <Route exact path="/home/add">
            <AddGoods />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  
});

const mapDispatchToProps = (dispatch) => ({
  getProfileStart: () => dispatch(getProfileStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
