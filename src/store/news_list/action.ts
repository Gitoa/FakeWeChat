import * as ActionTypes from './actionTypes';
import { NewsProps } from 'base/single_news'

export interface Action {
  type: string;
  news?: NewsProps;
  delNewsId?: string;
  newsList?: NewsProps[];
}

export const deleteNews = (newsId: string|number) => {
  return {
    type: ActionTypes.NEWS_DELETE,
    newsId,
  }
}

export const addNews = (news: NewsProps) => {
  return {
    type: ActionTypes.NEWS_ADD,
    news,
  }
}

export const initNewsList = (newsList: NewsProps[]) => {
  return {
    type: ActionTypes.NEWS_INIT,
    newsList,
  }
}