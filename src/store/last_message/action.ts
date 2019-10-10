import * as ActionTypes from './actionTypes';
import { MessageState } from './index';
import { SingleMessageProps } from 'base/single_message';

export interface Action {
  type: string;
  chatId?: string;
  msg?: SingleMessageProps;
  msgState?: MessageState
}

export const initLastMessage = (msgState: MessageState): Action => {
  return {
    type: ActionTypes.INIT_LAST_MESSAGE,
    msgState,
  }
}

export const updateLastMessage = (msg: SingleMessageProps, chatId: string): Action => {
  return {
    type: ActionTypes.UPDATE_LAST_MESSAGE,
    chatId,
    msg,
  }
}