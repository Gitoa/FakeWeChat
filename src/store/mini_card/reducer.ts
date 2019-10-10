import * as ActionTypes from './actionTypes';
import { MiniCardProps } from 'base/mini_card';
import Action from './action';

export const initState:MiniCardProps = {name: 'default', id: '-1', type: 'private', wechatId: '-1', location:'杭州'};

function reducer(state: MiniCardProps, action: Action): MiniCardProps {
  console.log(action);
  switch(action.type) {
    case ActionTypes.MINI_CARD_CHANGE:
      return action.card;
    default:
      return state;
  }
}

export default reducer;