import React from 'react';
import { SingleMessageProps } from 'base/single_message';
import { getMsgTime } from 'common/js/utils';
import './index.scss';

export interface NewsProps {
  type: 'group' | 'private';
  id: string;
  avatar?: string;
  name: string;
  lastMsg?: SingleMessageProps;
  unreadMsgCount?: number;
}

function SingleNews(props: NewsProps){

  return (
    <div className='single-news'>
      <div className='avatar-wrapper' style={{backgroundImage: props.avatar?`url(http://localhost:3080${props.avatar})`:'url(http://gitoa.top:3050/static/img/default.jpg)'}}>
      </div>
      <div className='info-wrapper'>
        <div className='title-wrapper'>
          <p className='name'>{props.name}</p>
          <p className='time'>{props.lastMsg ? getMsgTime(Number(props.lastMsg.time)) : '--/--'}</p>
        </div>
        <div className='msg-wrapper'>
          <span>{props.unreadMsgCount && props.unreadMsgCount > 0 ? `[${props.unreadMsgCount}条] ` : ''}</span>
          <span>{props.lastMsg ? props.lastMsg.content: '暂无消息'}</span>
        </div>
      </div>
    </div>
  )
}

export default SingleNews;