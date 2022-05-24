import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Routes from "./app/Routes";
import { requireAuth } from "./common/services/authHoc";
import Preloader from "./components/Preloader/Preloader";

function App() {
  // const dispatch = useDispatch();
  // const initialized = useSelector((state) => state.appReducer.initialized);
  // useEffect(() => {
  //   debugger
  //   dispatch(initialize());
  // }, [dispatch]);

  // if (!initialized) {
  //   return (
  //     <div style={{ textAlign: "center", marginTop: 300 }}>
  //       <Preloader />
  //     </div>
  //   );
  // }

  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default function MyApp() {
  return requireAuth(App);
}