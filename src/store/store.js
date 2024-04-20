import {
  applyMiddleware,
  legacy_createStore as createStore,
  compose,
  combineReducers,
} from "redux";
import { thunk } from "redux-thunk";
import { bagReducer } from "../redux/Cart/reducer";
import { loginReducer } from "../redux/login/loginreducer";

const rootreducer = combineReducers({
  bag: bagReducer,
  loginreq: loginReducer,
});

export const store = createStore(rootreducer, compose(applyMiddleware(thunk)));
