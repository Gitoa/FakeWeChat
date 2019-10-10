import React, { useEffect, useContext } from 'react';
import logo from './logo.svg';
import './App.css';
import WeChat from 'components/wechat';
import { Admin, User, Group, OptMsg } from './common/js/interfaces';
import { getCookie } from './common/js/utils';
import { Context as AdminContext } from 'store/admin';
import { Context as FriendContext } from 'store/friend';
import { Action as FriendAction, initFriendList, addFriend, deleteFriend } from 'store/friend/action';
import { Context as NewsListContext } from 'store/news_list';
import { Action as NewsListAction, initNewsList, addNews } from 'store/news_list/action';
import { Context as GroupListContext } from 'store/group';
import GroupListAction, { initGroupList } from 'store/group/action';
import { Context as RecordContext } from 'store/record';
import { Context as NewsChatContext } from 'store/news_chat';
import RecordListAction, { initRecordList } from 'store/record/action';
import { Context as MessageContext } from 'store/messages';
import { addMsgs } from 'store/messages/action';
import { Context as UnreadMsgContext } from 'store/unread_messages';
import { addUnreadMessage, initUnreadMessage } from 'store/unread_messages/action';
import { Context as lastMsgContext } from 'store/last_message';
import { updateLastMessage, initLastMessage } from 'store/last_message/action';
import socketContainer from 'common/js/socketContainer';
import { SingleMessageProps } from 'base/single_message';
import { NewsProps } from 'base/single_news';
import { saveLocalLastMsg, saveLocalMsgs, saveLocalNews, saveLocalUnreadMsgs, getLocalLastMsg, getLocalNews, getLocalUnreadMsgs, saveLocalMsg } from 'common/js/cache';

const App: React.FC = () => {
  const { state: adminState, dispatch: adminDispatch } = useContext(AdminContext);
  const { state: friendState, dispatch: friendDispatch }  = useContext(FriendContext);
  const { state: newsListState, dispatch: newsListDispatch } = useContext(NewsListContext);
  const { dispatch: groupListDispatch } = useContext(GroupListContext);
  const { dispatch: recordListDispatch } = useContext(RecordContext);
  const { state: msgState, dispatch: msgDispatch } = useContext(MessageContext);
  const { state: newsChatState } = useContext(NewsChatContext);
  const { state: unreadMsgState, dispatch: unreadMsgDispatch } = useContext(UnreadMsgContext);
  const { state: lastMsgState, dispatch: lastMsgDispatch } = useContext(lastMsgContext);

  function msgCb(data: SingleMessageProps) {
    let chatId = '', news: NewsProps;
    if (data.type === 'private') {
      chatId = 'private' + data.senderId;
      news = {
        type: 'private', id: data.senderId, avatar: data.senderAvatar, name: data.senderName,
      }
      if (newsChatState.type === 'private' && newsChatState.id == data.senderId) {
        msgDispatch(addMsgs(adminState.id, chatId, [data]));
      } else {
        unreadMsgDispatch(addUnreadMessage([data], chatId));
      }
      newsListDispatch(addNews(news));
    } else if (data.type === 'group') {
      chatId = 'group' + data.groupId;
      news = {
        type: 'group', id: (data.groupId as string), avatar: data.groupAvatar, name: (data.groupName as string),
      }
      if (newsChatState.type === 'group' && newsChatState.id == data.groupId) {
        msgDispatch(addMsgs(adminState.id, chatId, [data]));
      } else {
        unreadMsgDispatch(addUnreadMessage([data], chatId));
      }
      newsListDispatch(addNews(news));
    } else {
      // data.type === 'stranger'
    }
    lastMsgDispatch(updateLastMessage(data, chatId));
  }
  
  useEffect(() => {
    let adminID = getCookie('userId');
    if (adminID) {
      fetch("/init_info?user_id=" + adminID).then(response => {
        if (response.ok || response.status === 304) {
          return response.json();
        }
        throw new Error("response not ok");
      }).then(data => {
        let friendList = data.friend.map((item: User) => ({type: 'private', ...item}));
        let groupList = data.group.map((item: Group) => ({type: 'group', ...item}));

        (adminDispatch as React.Dispatch<{type: string, admin: Admin}>)({
          type: 'ADD',
          admin: data.admin
        });
        (friendDispatch as React.Dispatch<FriendAction>)(
          initFriendList(friendList)
        );
        (groupListDispatch as React.Dispatch<GroupListAction>)(
          initGroupList(groupList)
        )
      }).catch(e => console.log(e))
    } else {
      window.location.href = '/sign';
      return;
    }
  }, [])

  useEffect(() => {
    socketContainer.socket = io.connect('http://localhost:3080');
    socketContainer.socket.on('connect_confirm', (data: string) => {
      (socketContainer.socket as SocketIOClient.Socket).emit('config_init', {'userId': adminState.id})
    })

    socketContainer.socket.on('msg', msgCb)

    socketContainer.socket.on('opt', (msg: OptMsg) => {
      switch(msg.actionType) {
        case 'addFriend':
          friendDispatch(addFriend({name: msg.senderName, id: msg.senderId, avatar: msg.senderAvatar, type: 'private'}));
          break;
        case 'deleteFriend':
          friendDispatch(deleteFriend(msg.senderId));
          break;
        default:
          return;
      }
    })
    return function releaseSocket() {
      (socketContainer.socket as SocketIOClient.Socket).emit('disconnect');
      (socketContainer.socket as SocketIOClient.Socket).removeAllListeners();
      socketContainer.socket = undefined;
    }
  }, [adminState.id])

  useEffect(() => {
    let adminId = adminState.id;
    let localLastMsg = getLocalLastMsg(adminId), localNewsList = getLocalNews(adminId), localUnreadMsg = getLocalUnreadMsgs(adminId);
    newsListDispatch(initNewsList(localNewsList));
    unreadMsgDispatch(initUnreadMessage(localUnreadMsg));
    lastMsgDispatch(initLastMessage(localLastMsg));
  }, [adminState])

  useEffect(() => {
    if (socketContainer.socket) {
      socketContainer.socket.removeEventListener('msg');
      socketContainer.socket.on('msg', msgCb);
    }
    return function removeMsgListener() {
      socketContainer.socket && (socketContainer.socket as SocketIOClient.Socket).removeEventListener('msg');
    }
  }, [newsChatState])

  useEffect(() => {
    function cb() {
      let adminId = adminState.id;
      saveLocalNews(adminId, newsListState);
      saveLocalUnreadMsgs(adminId, unreadMsgState);
      saveLocalLastMsg(adminId, lastMsgState);
      Object.entries(msgState).forEach(([key, value]) => {
        saveLocalMsg(adminId, key, value as SingleMessageProps[]);
      })
    }

    window.addEventListener('beforeunload', cb)

    return function removeListener() {
      window.removeEventListener('beforeunload', cb);
    }
  }, [adminState, newsListState, msgState, unreadMsgState, lastMsgState])

  return (
    <div className="App">
      <WeChat></WeChat>
    </div>
  );
}

export default App;
