import * as ActionTypes from './actionTypes';
import { User } from 'common/js/interfaces';

export interface Action {
  type: string;
  user?: User;
  userList?: User[];
  userId?: string;
}

export const delFriend = (id: string) => {
  return {
    type: ActionTypes.FRIEND_DELETE,
    delId: id,
  }
}

export const addFriend = (user: User) => {
  return {
    type: ActionTypes.FRIEND_ADD,
    user,
  }
}

export const initFriendList = (userList: User[]) => {
  return {
    type: ActionTypes.FRIEND_INIT,
    userList,
  }
}