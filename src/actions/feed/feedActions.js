import { memoCheck, memoSet } from "../../util/memoize";
import * as RssParser from "react-native-rss-parser";
import fetch from "cross-fetch";

// const MAX_FEED_COUNT = 25;

export const requestFeed = feedUrl => ({
  type: "REQUEST_FEED",
  feedUrl
});

export const receiveFeed = (feedUrl, json) => ({
  type: "RECEIVE_FEED",
  feedUrl,
  feed: json,
  receivedAt: Date.now()
});

export const errorDuringFetch = (feedUrl, error) => ({
  type: "ERROR_DURING_FEED_FETCH",
  feedUrl,
  error
});

export const fetchFeed = feedUrl => dispatch => {
  dispatch(requestFeed(feedUrl));
  // const feed = await fetch(enableCors(feedUrl));
  return fetch(feedUrl)
    .then(feedResponse => feedResponse.text())
    .then(feed => {
      RssParser.parse(feed)
        .then(response => {
          const feedItems = [];
          let { items, ...meta } = response;
          items.forEach(item => {
            feedItems.push({ type: "FEED_ITEM", values: item });
          });
          const feedData = {
            meta,
            items: feedItems
          };
          memoSet(feedUrl, {
            timestamp: Date.now(),
            data: feedData
          });
          dispatch(receiveFeed(feedUrl, feedData));
        })
        .catch(e => {
          dispatch(errorDuringFetch(feedUrl, { message: e.message, detailed: e.stack }));
        });
    });
};

const shouldFetchFeed = (state, feedUrl) => {
  let shouldFetch = false;
  const feed = state.feeds[feedUrl];
  if (!feed) shouldFetch = true;
  return shouldFetch;
};

export const fetchFeedIfNeeded = feedUrl => (dispatch, getState) => {
  if (shouldFetchFeed(getState(), feedUrl)) {
    memoCheck(feedUrl)
      .then(memoStore => {
        return dispatch(receiveFeed(feedUrl, memoStore.data));
      })
      .catch(error => {
        return dispatch(fetchFeed(feedUrl));
      });
  }
};
