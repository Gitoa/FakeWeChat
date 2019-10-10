import React from 'react';
import './index.scss';

export interface SingleMessageProps {
  senderName: string;
  senderAvatar?: string;
  senderId: string;

  receiverName: string;
  receiverAvatar?: string;
  receiverId: string;

  content: string;
  contentType?: 'string';

  groupId?: string;
  groupName?: string;
  groupAvatar?: string;
  
  type: 'group' | 'private' | 'stranger';
  time: string;
  status: string;
  msgId: string;
  fromMe?: boolean;
  index?: string; // 聊天索引
}

function SingleMessage(props: SingleMessageProps) {
  
  return (
    <div className={props.fromMe?'single-message from-me': 'single-message from-others'}>
      <div className='avatar' style={{backgroundImage: props.senderAvatar ? `url(http://localhost:3080${props.senderAvatar})` : 'url(http://localhost/3080/static/img/default.jpg)'}}></div>
      <div className='info-wrapper'>
        {
          props.fromMe ? '' : <p className='name'>{ props.senderName }</p>
        }
        <div className='content'>{ props.content }</div>
      </div>
    </div>
  )
}

export default SingleMessage;