import * as ActionTypes from './actionTypes';
import { ChatProps } from 'base/chat';

export interface Action {
  type: string;
  chat: ChatProps;
}

export const CHANGE_CHAT = (chat: ChatProps) => {
  return {
    type: ActionTypes.CHANGE_STRANGER_CHAT,
    chat,
  }
}