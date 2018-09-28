import { FETCH_FEED } from "../types"

export function fetchFeed(){
  return (dispatch) => {
    dispatch({
      type: FETCH_FEED,
      payload: {}
    })
  }
}