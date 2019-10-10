import { Action } from './action';
import { NewsProps } from 'base/single_news'
import * as ActionTypes from './actionTypes';
import cloneDeep from 'lodash/cloneDeep';

export const initState: NewsProps[] = [];

const reducer = (state: NewsProps[], action: Action): NewsProps[] => {

  const { type } = action;
  let newState = cloneDeep(state);

  switch (type) {
    case ActionTypes.NEWS_DELETE:
      let delNewsId = action.delNewsId;
      newState = newState.filter(news => {
        return news.id !== delNewsId
      })
      return newState;

    case ActionTypes.NEWS_ADD:
      let addNews = (<NewsProps>action.news);
      let index = newState.findIndex(news => news.type === addNews.type && news.id === addNews.id)
      index > -1 && newState.splice(index, 1);
      newState.unshift(addNews);
      return newState;

    case ActionTypes.NEWS_INIT:
      return (action.newsList as NewsProps[]);

    default:
      return state;
  }
}

export default reducer;