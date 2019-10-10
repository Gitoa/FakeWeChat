import * as ActionTypes from './actionTypes';
import { MessageState } from './index';
import Action from './action';
import cloneDeep from 'lodash/cloneDeep';
import { getLocalMsg } from 'common/js/cache';

export const initState = {};

function reducer(state: MessageState, action: Action): MessageState {
  let newState = cloneDeep(state);
  switch(action.type) {

    case ActionTypes.MESSAGES_INIT:
      return action.newMsgs;

    case ActionTypes.MESSAGES_ADD:
      if (action.msgs.length === 0 && newState[action.chatId]) {
        return state;
      }
      if (!newState[action.chatId]) {
        let localMsg = getLocalMsg(action.adminId as string, action.chatId);
        console.log(localMsg);
        newState[action.chatId] = localMsg ? localMsg : [];
      }
      newState[action.chatId].push(...action.msgs);
      console.log(newState);
      return newState;

    case ActionTypes.MESSAGES_DELETE:
      let index = newState[action.chatId].findIndex(item => item.msgId = action.msgId);
      index > -1 && newState[action.chatId].splice(index, 1);
      return newState;

    case ActionTypes.MESSAGES_CLEAR:
      newState[action.chatId] = [];
      return newState;

    default:
      return state;
  }
}

export default reducer;