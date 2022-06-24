import Routes from "./app/Routes";
import { requireAuth } from "./common/services/authHoc";

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