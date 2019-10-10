import React, { useContext } from 'react';
import './index.scss';
import { Context } from 'store/news_chat';
import { changeNewsChat } from 'store/news_chat/action';
import { useHistory } from "react-router-dom";
import { Context as NewsListContext } from 'store/news_list';
import { addNews } from 'store/news_list/action';

export interface InfoCardProps {
  id: string;
  name: string;
  avatar?: string;
  gender?: 'boy'|'girl';
  source?: string;
  location?: string;
  wechatId?: string;
  slogan?: string;
  creator?: string;
  operation: string;
  type: 'group' | 'private' | 'stranger' | 'record';
  handled?: boolean;
  attachMsg?: string;
  sendByMe?: boolean;
  senderName?: string;
  receiverName?: string;
}

function InfoCard(props: InfoCardProps) {

  const { dispatch } = useContext(Context);

  const { dispatch: newsListDispatch } = useContext(NewsListContext);

  const history = useHistory();

  function startChat() {
    newsListDispatch(addNews({name: props.name, type: (props.type as 'private'|'group'), id: props.id, avatar: props.avatar}));
    dispatch(changeNewsChat({name: props.name, type: (props.type as 'private'|'group'), id: props.id, avatar: props.avatar}));
    history.push('/news')
  }

  let name = props.name;
  if(props.type === 'record') {
    name = (props.sendByMe ? props.receiverName : props.senderName) as string;
  }
  let unhandleRecord = (props.type === 'record' && !props.handled);

  return (
    <div className='info-card'>
      <div className='title-wrapper'>
        <div className='base-info'>
          <span className='name'>{name}</span><span className='gender-icon' style={{ color: props.gender === 'boy' ? 'blue' : 'red' }}></span>
          <p className='slogan'>{props.slogan}</p>
        </div>
        <div className='avatar-wrapper' style={{ backgroundImage: props.avatar ? `url(http://localhost:3080${props.avatar})` : 'url(http://gitoa.top:3050/static/img/default.jpg)' }}></div>
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
          <div className={`button-wrapper ${props.id === '-1' ? 'hide' : ''}`}>
            <p className='confirm-button'>{'通过验证'}</p>
          </div>
            : 
          <div className={`button-wrapper ${props.id === '-1' ? 'hide' : ''}`}>
            <p className='chat-button' onClick={startChat}>{'发送消息'}</p>
            <p className='delete-button'>{props.operation}</p>
          </div>
      }   
    </div>
  )
}

export default InfoCard;