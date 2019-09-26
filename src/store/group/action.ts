import * as ActionTypes from './actionTypes';
import { Group } from 'common/js/interfaces';

export default interface Action {
  type: string;
  group?: Group;
  groupId?: string;
  groupList?: Group[];
}

export function addGroup(group: Group): Action {
  return {
    type: ActionTypes.GROUP_ADD,
    group,
  }
}

export function delGroup(groupId: string): Action {
  return {
    type: ActionTypes.GROUP_DELETE,
    groupId,
  }
}

export function initGroupList(groupList: Group[]): Action {
  return {
    type: ActionTypes.GROUP_INIT,
    groupList,
  }
}