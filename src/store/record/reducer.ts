import Action from './action';
import { ApplyRecord } from 'common/js/interfaces';
import * as ActionTypes from './actionTypes';
import cloneDeep from 'lodash/cloneDeep';

export const initState: ApplyRecord[] = [];

const reducer = (state: ApplyRecord[], action: Action): ApplyRecord[] => {
  let newState = cloneDeep(state);
  let index = -1;
  switch(action.type) {

    case ActionTypes.RECORD_INIT:
      return (action.recordList as ApplyRecord[]);

    case ActionTypes.RECORRD_ADD:
      newState.push((action.newRecord as ApplyRecord));
      return newState;
    
    default:
      return newState;
  }
}

export default reducer;