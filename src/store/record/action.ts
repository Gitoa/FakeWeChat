import * as ActionTypes from './actionTypes';
import { ApplyRecord } from 'common/js/interfaces';

export default interface Action {
  type: string;
  recordList?: ApplyRecord[];
  newRecord?: ApplyRecord;
}

export function initRecordList(recordList: ApplyRecord[]): Action {
  return {
    type: ActionTypes.RECORD_INIT,
    recordList,
  }
}

export function addRecord(newRecord: ApplyRecord): Action {
  return {
    type: ActionTypes.RECORRD_ADD,
    newRecord,
  }
}