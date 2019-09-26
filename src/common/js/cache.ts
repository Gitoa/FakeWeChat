import { NewsListProps } from 'components/news-list';
import { NewsProps } from 'base/single_news';
import { User, Group, ApplyRecord } from 'common/js/interfaces';
import Mock from 'mockjs';

const Random = Mock.Random;

export const getLocalNews = (adminId: string): NewsProps[] => {
  let newsList: NewsProps[] = []
  let localSave = localStorage.getItem(adminId);
  if (!localSave) {
    return newsList;
  }
  let localSaveObj = JSON.parse(localSave);
  newsList = localSaveObj.newsList;
  return newsList;
}

export const getMockNewsList = (): NewsProps[] => {
  let mockData = Mock.mock({
    'list|20-25':[{
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