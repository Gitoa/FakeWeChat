import React from 'react';
import { SingleMessageProps } from 'base/single_message';
import './index.scss';

export interface NewsProps {
  type: 'group' | 'private';
  id: string;
  avatar?: string;
  name: string;
  lastMsg?: SingleMessageProps;
}

function SingleNews(props: NewsProps){
  return (
    <div className='single-news'>
      <div className='avatar-wrapper' style={{backgroundImage: props.avatar?`url(${props.avatar})`:'url(http://gitoa.top:3050/static/img/default.jpg)'}}>
      </div>
      <div className='info-wrapper'>
        <div className='title-wrapper'>
          <p className='name'>{props.name}</p>
          <p className='time'>{props.lastMsg ? props.lastMsg.time : '--/--'}</p>
        </div>
        <div className='msg-wrapper'>{props.lastMsg ? props.lastMsg.content: '这是一条测试消息，这是一条测试消息啊啊啊啊啊'}</div>
      </div>
    </div>
  )
}

export default SingleNews;