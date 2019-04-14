import { call, put } from "redux-saga/effects";
import * as Api from "./api";
export function* fetchCategories() {
  try {
    const categories = yield call(Api.fetch, "/categories");
    yield put({ type: "RECEIVED_CATEGORIES", categories });
  } catch (error) {
    yield put({ type: "FETCH_CATEGORIES_FAILED", error });
  }
}
