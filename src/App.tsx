import React, { useEffect, useContext } from 'react';
import logo from './logo.svg';
import './App.css';
import WeChat from 'components/wechat';
import { Admin } from './common/js/interfaces';
import { getCookie } from './common/js/utils';
import { getMockFriendList, getMockNewsList, getMockGroupList, getMockRecordList } from 'common/js/cache';
import { Context as AdminContext } from 'store/admin';
import { Context as FriendContext } from 'store/friend';
import { Action as FriendAction, initFriendList } from 'store/friend/action';
import { Context as NewsListContext } from 'store/news_list';
import { Action as NewsListAction, initNewsList } from 'store/news_list/action';
import { Context as GroupListContext } from 'store/group';
import GroupListAction, { initGroupList } from 'store/group/action';
import { Context as RecordContext } from 'store/record';
import RecordListAction, { initRecordList } from 'store/record/action';

const App: React.FC = () => {
  const { state: adminState, dispatch: adminDispatch } = useContext(AdminContext);
  const { state: friendState, dispatch: friendDispatch }  = useContext(FriendContext);
  const { state: newsListState, dispatch: newsListDispatch } = useContext(NewsListContext);
  const { dispatch: groupListDispatch } = useContext(GroupListContext);
  const { dispatch: recordListDispatch } = useContext(RecordContext);
  
  useEffect(() => {
    let adminID = getCookie('userId');
    if (adminID) {
      fetch("/user_info?user_id=" + adminID).then(response => {
        if (response.ok || response.status === 304) {
          return response.json();
        }
        throw new Error("response not ok");
      }).then(data => {
        (adminDispatch as React.Dispatch<{type: string, admin: Admin}>)({
          type: 'ADD',
          admin: data
        });
      }).catch(e => console.log(e))
    } else {
      window.location.href = '/sign';
      return;
    }
  }, [])

  useEffect(() => {
    let friendList = getMockFriendList();
    (friendDispatch as React.Dispatch<FriendAction>)(
      initFriendList(friendList)
    )
  }, [adminState.id])

  useEffect(() => {
    let newsList = getMockNewsList();
    console.log(newsList);
    (newsListDispatch as React.Dispatch<NewsListAction>)(
      initNewsList(newsList)
    )
  }, [adminState.id])

  useEffect(() => {
    let groupList = getMockGroupList();
    (groupListDispatch as React.Dispatch<GroupListAction>)(
      initGroupList(groupList)
    )
  }, [adminState.id])

  useEffect(() => {
    let recordList = getMockRecordList();
    (recordListDispatch as React.Dispatch<RecordListAction>)(
      initRecordList(recordList)
    )
  }, [adminState.id])

  return (
    <div className="App">
      <WeChat></WeChat>
    </div>
  );
}

export default App;
