import * as ActionTypes from './actionTypes';
import { Action } from './action';
import { ChatProps } from 'base/chat';

export const initState: ChatProps = {
  name: '',
  type: 'private',
  id: '-1',
};

const reducer = (state: ChatProps, action: Action): ChatProps => {
  switch(action.type) {
    case ActionTypes.CHANGE_NEWS_CHAT:
      console.log(action.chat);
      return action.chat;
    default:
      return state;
  }
}

export default reducer;