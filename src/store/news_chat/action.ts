import * as ActionTypes from './actionTypes';
import { ChatProps } from 'base/chat';

export interface Action {
  type: string;
  chat: ChatProps;
}

export const changeNewsChat = (chat: ChatProps) => {
  return {
    type: ActionTypes.CHANGE_NEWS_CHAT,
    chat,
  }
}