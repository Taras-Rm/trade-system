import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Routes from "./app/Routes";
import { requireAuth } from "./common/services/authHoc";
import Preloader from "./components/Preloader/Preloader";

function App() {
  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default function MyApp() {
  return requireAuth(App);
}