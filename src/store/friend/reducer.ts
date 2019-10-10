

import * as ActionTypes from './actionTypes';
import { User } from 'common/js/interfaces';
import cloneDeep from 'lodash/cloneDeep';
import { Action } from './action';

export const initState: User[] = [];

const reducer = (state: User[], action: Action): User[] => {
  const { type } = action;
  let newState = cloneDeep(state), index = -1;
  
  switch(type) {
    case ActionTypes.FRIEND_ADD:
      let userId = (action.user as User).id;
      index = state.findIndex(item => item.id === userId);
      index === -1 && newState.push((action.user as User));
      return newState;
    case ActionTypes.FRIEND_DELETE:
      index = state.findIndex(item => item.id === userId)
      index > -1 && newState.splice(index, 1);
      return newState;
    case ActionTypes.FRIEND_INIT:
      return (action.userList as User[]);
    default:
      return state;
  }
}

export default reducer;