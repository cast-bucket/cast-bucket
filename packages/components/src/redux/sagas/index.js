import { takeEvery } from "redux-saga/effects";
import { fetchCategories } from "./categories";
import { fetchPodcasts } from "./podcasts";

export default function* rootSaga() {
  yield takeEvery("FETCH_CATEGORIES", fetchCategories);
  yield takeEvery("FETCH_PODCASTS", fetchPodcasts);
}
