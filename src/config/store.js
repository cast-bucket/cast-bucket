import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers";

export default function configureStore(preloadedState) {
  const middleware = [thunk];
  const store = createStore(rootReducer, preloadedState, applyMiddleware(...middleware));
  return store;
}
