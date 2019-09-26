import { User, Group, ApplyRecord } from 'common/js/interfaces';
import { Action } from './action';
import * as ActionTypes from './actionTypes';

export const initState: User|Group|ApplyRecord = {
  id: '-1',
  name: 'admin',
  type: 'user',
};

function reducer(state: User|Group|ApplyRecord, action: Action): User|Group|ApplyRecord {
  switch(action.type) {

    case ActionTypes.CONTACT_CARD_CHANGE:
      return action.contact;
    
    default:
      return state;
  }
}

export default reducer;
