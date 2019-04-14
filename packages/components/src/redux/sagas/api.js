import axios from "axios";
import { call, put } from "redux-saga/effects";

const base = process.env.REACT_APP_API_URL || "https://cast-bucket-api.now.sh";
const mountpoint = process.env.REACT_APP_API_VERSION || "v1";

const api = `${base}/${mountpoint}`;
export function* fetch(url) {
  try {
    const { data } = yield call(axios.get, `${api}${url}`);
    yield put({ type: "FETCH_SUCCEEDED", data });
    return data;
  } catch (error) {
    yield put({ type: "FETCH_FAILED", error });
  }
}
