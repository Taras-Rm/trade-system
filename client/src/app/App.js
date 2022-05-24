import { BrowserRouter } from "react-router-dom";
import { requireAuth } from "../common/services/authHoc";
import Routes from "./Routes";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes />
      </div>
    </BrowserRouter> 
  );
}

export default requireAuth(App);