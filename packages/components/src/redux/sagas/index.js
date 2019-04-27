import { takeEvery } from "redux-saga/effects";
import { fetchCategories } from "./categories";

export default function* rootSaga() {
  yield takeEvery("FETCH_CATEGORIES", fetchCategories);
}
