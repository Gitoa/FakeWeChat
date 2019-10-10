import * as ActionTypes from './actionTypes';
import { SingleMessageProps } from 'base/single_message';
import { MessageState } from './index';

export interface Action {
  type: string;
  msgs?: SingleMessageProps[];
  chatId?: string;
  msgState?: MessageState;
}

export const addUnreadMessage = (msgs: SingleMessageProps[], chatId: string): Action => {
  return {
    type: ActionTypes.ADD_UNREAD_MESSAGE,
    msgs,
    chatId,
  }
}

export const clearUnreadMessage = (chatId: string): Action => {
  return {
    type: ActionTypes.CLEAR_UNREAD_MESSAGE,
    chatId,
  }
}

export const initUnreadMessage = (msgState: MessageState): Action => {
  return {
    type: ActionTypes.INIT_UNREAD_MESSAGE,
    msgState,
  }
}