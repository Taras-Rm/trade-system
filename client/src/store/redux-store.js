import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunkMiddlewayer from "redux-thunk";
import { authReducer } from "./authReducer";
import { loginReducer } from "./loginReducer";
import { homeReducer } from "./homeReducer";
import { goodsReducer } from "./goodsReducer";

let reducers = combineReducers({
  authReducer,
  loginReducer,
  homeReducer,
  goodsReducer,
});

// для Redux плагіна
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunkMiddlewayer))
);

//let store = createStore(reducers, applyMiddleware(thunkMiddlewayer));

window.store = store;

export default store;
