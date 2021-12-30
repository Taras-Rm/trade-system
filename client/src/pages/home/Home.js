import React, { useEffect } from "react";
import Header from "../../components/header/Header";
import "./Home.scss";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../store/homeReducer";
import Sidebar from "./sidebar/Sidebar";
import { Route, Switch } from "react-router";
import Profile from "./profile/Profile";
import Goods from "./goods/Goods";
import AddGoods from "./addGoods/AddGoods";

function Home() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.homeReducer.isSuccess);
  const user = useSelector((state) => state.homeReducer.user);

  useEffect(() => {
    // завантаження даних користувача з сервера
    dispatch(getUserProfile());
  }, [dispatch]);

  // перевірка чи профіль користувача завантажився
  if (!isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home">
      <Sidebar
        fullName={`${user.firstName} ${user.lastName}`}
        avatarLetter={user.firstName[0]}
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

export default Home;
