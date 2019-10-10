import React, { useContext, useState, useEffect } from 'react';
import { Context as FriendContext } from 'store/friend';
import { addFriend } from 'store/friend/action';
import { Context as GroupContext } from 'store/group';
import { addGroup } from 'store/group/action';
import { Context as AdminContext } from 'store/admin';
import { Context as NewsChatContext } from 'store/news_chat';
import { changeNewsChat } from 'store/news_chat/action';
import { Context as NewsListContext } from 'store/news_list';
import { addNews } from 'store/news_list/action';
import { joinGroup as joinGroupOp, addFriend as addFriendOp } from 'api/socketOps';
import './index.scss';
import { Group, User } from 'common/js/interfaces';

export interface MiniCardProps {
  avatar?: string;
  name: string;
  type: 'group' | 'private' | 'stranger';
  wechatId?: string;
  gender?: 'boy' | 'girl';
  id: string;

  location?: string;
  creator?: string;

  closeCb?: () => void;
}

function MiniCard(props: MiniCardProps) {

  const { state: groupState, dispatch: dispatchGroup } = useContext(GroupContext);
  const { state: friendState, dispatch: dispatchFriend } = useContext(FriendContext);
  const { state: adminState } = useContext(AdminContext);
  const { dispatch: dispatchNewsChat } = useContext(NewsChatContext);
  const { dispatch: newsListDispatch } = useContext(NewsListContext);
  const [status, setStatus] = useState(false);
  const [isMe, setIsMe] = useState(false);
  const id = props.id;

  function joinGroupCb() {
    console.log('try join group');
    joinGroupOp(adminState.id, props.id).then(() => {
      console.log('join group successful');
      dispatchGroup(addGroup(props as Group));
    }).catch(e => alert('加群失败,' + e))
  }

  function addFriendCb() {
    if (isMe) {
      console.log("can not add myself");
      return;
    }
    console.log('try add friend');
    addFriendOp(adminState.id, props.id, adminState.name, adminState.avatar).then(() => {
      console.log('add friend successful');
      dispatchFriend(addFriend(props as User));
    }).catch(e => alert('add friend failed,' + e))
  }

  function startChat() {
    newsListDispatch(addNews({name: props.name, type: (props.type as 'private'|'group'), id: props.id, avatar: props.avatar}));
    dispatchNewsChat(changeNewsChat(props));
    if (typeof props.closeCb === 'function') {
      props.closeCb();
    }
  }
  
  useEffect(() => {
    if (props.type === 'group') {
      let index = groupState.findIndex(group => group.id === id);
      setStatus(index > -1);
    } else if (props.type === 'private') {
      let index = friendState.findIndex(user => user.id === id);
      setStatus(index > -1);
      setIsMe(props.type === 'private' && adminState.id === props.id);
    }
  }, [props.type + props.id, groupState, friendState])

  return (
    <div className='mini-card' onClick={()=>{console.log('click in mini card')}}>
      <div className='top-wrapper'>
        <div className='base-info'>
          <p className='name'>{ props.name }</p>
          <p className='wechatId'><span>{'账号: '}</span>{ props.wechatId ? props.wechatId : props.id }</p>
        </div>
        <div className='avatar-wrapper' style={{backgroundImage: props.avatar ? `url(http://localhost:3080${props.avatar})` : 'url(http://gitoa.top:3050/static/img/default.jpg)'}}></div>
      </div>
      <div className='bottom-wrapper'>
        {
          props.location ? <div className='location tag'><span>{'地区'}</span><span>{ props.location }</span></div> : ''
        }
        {
          props.creator? <div className='creator tag'><span>{'群主'}</span><span>{ props.creator }</span></div> : ''
        }
      </div>
      <div className='operation'>
        {
          props.type === 'group' ? <div className='group'>{  !status ? <span className='join-icon' onClick={joinGroupCb}>{'入群'}</span> : <span className='chat-icon' onClick={startChat}>{'聊天'}</span> }</div> : ''
        }
        {
          props.type === 'private' ? <div className='private'>{ !status ? <span className='add-icon' onClick={addFriendCb}>{'添加'}</span> : <span className='chat-icon' onClick={startChat}>{'聊天'}</span> }</div> : ''
        }
      </div>
    </div>
  )
}

export default MiniCard;