import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Routes from "./app/Routes";
import Preloader from "./components/Preloader/Preloader";
import { initialize } from "./store/appReducer";

function App() {
  const dispatch = useDispatch();
  const initialized = useSelector((state) => state.appReducer.initialized);
  useEffect(() => {
    debugger
    dispatch(initialize());
  }, [dispatch]);

  if (!initialized) {
    return (
      <div style={{ textAlign: "center", marginTop: 300 }}>
        <Preloader />
      </div>
    );
  }

  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default function MyApp() {
  return <App />;
}

//export default App;
