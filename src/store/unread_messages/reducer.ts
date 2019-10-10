import { Action } from './action';
import * as ActionTypes from './actionTypes';
import { SingleMessageProps } from 'base/single_message';
import { MessageState } from './index';
import cloneDeep from 'lodash/cloneDeep';

export const initState: MessageState = {};

function reducer(state: MessageState, action: Action): MessageState {

  let newState = cloneDeep(state);
  switch(action.type) {
    case ActionTypes.ADD_UNREAD_MESSAGE:
      let chatId = action.chatId as string;
      newState[chatId] || (newState[chatId] = []);
      newState[chatId].push(...action.msgs as SingleMessageProps[]);
      console.log(newState);
      return newState;
    case ActionTypes.INIT_UNREAD_MESSAGE:
      return action.msgState as MessageState;
    case ActionTypes.CLEAR_UNREAD_MESSAGE:
      newState[action.chatId as string] = [];
      return newState;
    default:
      return state;
  }

}

export default reducer;