import Action from './action';
import * as ActionTypes from './actionTypes';
import { Group } from 'common/js/interfaces';
import cloneDeep from 'lodash/cloneDeep';

export const initState: Group[] = [];

function reducer(state: Group[], action: Action): Group[] {

  let newState = cloneDeep(state);
  let index = -1;

  switch(action.type) {
    case ActionTypes.GROUP_ADD:
      let group = (action.group as Group);
      index = newState.findIndex(item => group.id === item.id);
      index === -1 && (newState.push(group));
      return newState;

    case ActionTypes.GROUP_DELETE:
      let groupId = action.groupId
      index = newState.findIndex(item => item.id === groupId);
      index > -1 && newState.splice(index, 1);
      return newState;
      
    case ActionTypes.GROUP_INIT:
      return (action.groupList as Group[]);

    default:
      return newState;
  }
}

export default reducer;