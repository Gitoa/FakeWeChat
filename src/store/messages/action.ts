import * as ActionTypes from './actionTypes';
import { SingleMessageProps } from 'base/single_message';

export default interface Action {
  type: string;
  chatId: string;
  adminId?: string;
  msgs: SingleMessageProps[];
  [propsKey: string]: any;
}

export const addMsgs = (adminId: string, chatId: string, msgs: SingleMessageProps[]) =>{
  return {
    type: ActionTypes.MESSAGES_ADD,
    msgs,
    chatId,
    adminId,
  }
}

export const initMsg = (Msgs: any) => {
  return {
    type: ActionTypes.MESSAGES_INIT,
    newMsgs: Msgs,
  }
}

export const clearMsg = (adminId: string, chatId: string) => {
  return {
    type: ActionTypes.MESSAGES_CLEAR,
    chatId,
    adminId,
  }
}

export const deleteMsg = (adminId:string, chatId: string, msgId: string) => {
  return {
    type: ActionTypes.MESSAGES_DELETE,
    chatId,
    msgId,
    adminId,
  }
}