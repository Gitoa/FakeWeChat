import * as ActionTypes from './actionTypes';
import { User, Group, ApplyRecord } from 'common/js/interfaces';

export interface Action {
  type: string;
  contact: User|Group|ApplyRecord;
}

export const changeContactCard = (contact: User|Group|ApplyRecord): Action => {
  return {
    type: ActionTypes.CONTACT_CARD_CHANGE,
    contact,
  }
}