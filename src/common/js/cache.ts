import { NewsListProps } from 'components/news_list';
import { NewsProps } from 'base/single_news';
import { User, Group, ApplyRecord } from 'common/js/interfaces';
import Mock from 'mockjs';
import { SingleMessageProps } from 'base/single_message';
import { MessageState as LastMessageState } from 'store/last_message';
import { MessageState as MsgState } from 'store/messages';
import { MessageState as UnreadMsgState } from 'store/unread_messages';

const Random = Mock.Random;

export const getMockNewsList = (): NewsProps[] => {
  let mockData = Mock.mock({
    'list|3-6':[{
      'type|1': ['private', 'group'],
      'id|+1': 1,
      'name': Random.string()
    }]
  })
  return mockData.list;
}

export const getMockFriendList = (): User[] => {
  let mockData = Mock.mock({
    'list|20-25': [{
      'id|+1': 1,
      'name': Random.string(),
      'type': 'user',
      'wechatId|+1': 10,
    }]
  })
  return mockData.list;
}

export const getMockGroupList = (): Group[] => {
  let mockData = Mock.mock({
    'list|20-25': [{
      'id|+1': 1,
      'name': Random.string(),
      'creator|+1': 1,
      'type': 'group',
    }]
  })
  return mockData.list;
}

export const getMockRecordList = (): ApplyRecord[] => {
  let mockData = Mock.mock({
    'list|5-10': [{
      'applyType': Random.string(),
      'attachMsg': Random.string(),
      'time': Random.string(),
      'sendByMe': false,
      'senderId': Random.string(),
      'senderName': Random.string(),
      'senderAvatar': Random.string(),
      'handled': Random.boolean(),
      'id|+1': 1,
      'type': 'record',
      'wechatId|+1': 10,
    }]
  })
  return mockData.list;
}

export const getMockLocalMsg = (adminId?: string, chatId?: string) => {
  let mockData = Mock.mock({
    'list|5-10': [{
      'senderName': Random.string(),
      'senderAvatar|+1': 1,
      'senderId': Random.string(),
      'receiverName': Random.string(),
      'receiverId': Random.string(),
      'content': Random.string(),
      'type': 'private',
      'time': Random.string(),
      'status': Random.string(),
      'msgId': Random.string(),
      'fromMe': Random.boolean(),
    }]
  })
  return {msgList: mockData.list};
}

export const getMockGroupMembers = () => {
  let mockData = Mock.mock({
    'list|5-10': [{
      'id|+1': 1,
      'wechatId|+1': 1,
      'name': Random.string(),
      'type': 'private',
      'avatar': '/static/img/avatar' + Random.natural(1, 16) + '.jpeg'
    }]
  })
  return mockData.list;
}

export function saveLocalNews(adminId: string, newsList: NewsProps[]) {
  localStorage.setItem('news/' + adminId, JSON.stringify(newsList));
}

export function getLocalNews(adminId: string): NewsProps[]{
  let newsList = localStorage.getItem('news/' + adminId);
  if (newsList) {
    return JSON.parse(newsList);
  }
  return [];
}

export function saveLocalLastMsg(adminId: string, lastMsgList: LastMessageState) {
  localStorage.setItem('lastMsg/' + adminId, JSON.stringify(lastMsgList));
}

export function getLocalLastMsg(adminId: string): LastMessageState {
  let lastMsg = localStorage.getItem('lastMsg/' + adminId);
  if (lastMsg) {
    return JSON.parse(lastMsg);
  }
  return {};
}

export function saveLocalMsgs(adminId: string, msgs: MsgState) {
  localStorage.setItem('msg/' + adminId, JSON.stringify(msgs));
}

export function getLocalMsgs(adminId: string): MsgState {
  //本地聊天记录按照(adminId/chatId)的形式单个存储还是以adminId整个存储？单个存储io消耗小，但是无法针对adminId清除所有记录
  let msgs = localStorage.getItem('msg/' + adminId);
  if (msgs) {
    return JSON.parse(msgs);
  }
  return {};
}

export function saveLocalMsg(adminId: string, chatId: string, msgs: SingleMessageProps[]) {
  localStorage.setItem('msg/' + adminId + '/' + chatId, JSON.stringify(msgs));
}

export const getLocalMsg = (adminId: string, chatId: string): SingleMessageProps[] => {
  console.log(adminId, chatId);
  let msgs = localStorage.getItem('msg/' + adminId + '/' + chatId);
  if (msgs) return JSON.parse(msgs);
  return [];
}

export function saveLocalUnreadMsgs(adminId:string, msgs: UnreadMsgState) {
  localStorage.setItem('unreadMsg/' + adminId, JSON.stringify(msgs));
}

export function getLocalUnreadMsgs(adminId: string): UnreadMsgState {
  let unreadMsgs = localStorage.getItem('unreadMsg/' + adminId);
  if (unreadMsgs) {
    return JSON.parse(unreadMsgs);
  }
  return {};
}