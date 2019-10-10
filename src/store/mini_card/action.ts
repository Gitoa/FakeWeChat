import * as ActionTypes from './actionTypes';
import { MiniCardProps } from 'base/mini_card';

export default interface Action{
  type: string;
  card: MiniCardProps;
}

export const changeMiniCard = (card: MiniCardProps) => {
  return {
    type: ActionTypes.MINI_CARD_CHANGE,
    card,
  }
}