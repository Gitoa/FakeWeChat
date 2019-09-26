import React from 'react';
import './index.scss';

export interface InfoCardProps {
  name?: string;
  avatar?: string;
  gender?: 'boy'|'girl';
  source?: string;
  location?: string;
  wechatId?: string;
  slogan?: string;
  creator?: string;
  operation: string;
  type: string;
  handled?: boolean;
  attachMsg?: string;
  sendByMe?: boolean;
  senderName?: string;
  receiverName?: string;
}

function InfoCard(props: InfoCardProps) {
  let name = props.name;
  if(props.type === 'record') {
    name = (props.sendByMe ? props.receiverName : props.senderName);
  }
  let unhandleRecord = (props.type === 'record' && !props.handled)

  return (
    <div className='info-card'>
      <div className='title-wrapper'>
        <div className='base-info'>
          <span className='name'>{name}</span><span className='gender-icon' style={{ color: props.gender === 'boy' ? 'blue' : 'red' }}>{props.gender || 'boy' }</span>
          <p className='slogan'>{props.slogan}</p>
        </div>
        <div className='avatar-wrapper' style={{ backgroundImage: props.avatar ? `url(${props.avatar})` : 'url(http://gitoa.top:3050/static/img/default.jpg)' }}></div>
      </div>
      <ul className='info-wrapper' style={{ marginBottom: unhandleRecord ? '20px' : '80px' }}>
        { props.location ?  (<li><span>{'地区'}</span><span>{props.location}</span></li>) : '' }
        { props.wechatId ? (<li><span>{'微信号'}</span><span>{props.wechatId}</span></li>) : '' }
        { props.source ? (<li><span>{'来源'}</span><span>{props.source}</span></li>) : '' }
        { props.creator ? (<li><span>{'群主'}</span><span>{props.creator}</span></li>) : '' }
      </ul>
      {
        unhandleRecord ? <div className='attach-msg'><span>{'打招呼'}</span><span>{props.attachMsg}</span></div> : ''
      }
      {
        unhandleRecord ? 
          <div className='button-wrapper'>
            <p className='confirm-button'>{'通过验证'}</p>
          </div>
            : 
          <div className='button-wrapper'>
            <p className='chat-button'>{'发送消息'}</p>
            <p className='delete-button'>{props.operation}</p>
          </div>
      }   
    </div>
  )
}

export default InfoCard;