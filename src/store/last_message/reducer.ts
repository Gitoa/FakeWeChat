import { Action } from './action';
import * as ActionTypes from './actionTypes';
import cloneDeep from 'lodash/cloneDeep';
import { MessageState } from './index';
import { SingleMessageProps } from 'base/single_message';

export const initState: MessageState = {};

function reducer(state: MessageState, action: Action): MessageState {
  
  let newState = cloneDeep(state);
  switch(action.type) {
    case ActionTypes.INIT_LAST_MESSAGE:
      return action.msgState as MessageState;
    case ActionTypes.UPDATE_LAST_MESSAGE:
      newState[action.chatId as string] = action.msg as SingleMessageProps;
      return newState;
    default:
      return state;
  }

}

export default reducer;