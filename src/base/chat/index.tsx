import React, { useContext, useState, useRef } from 'react';
import ChatInformation from 'base/chat_information';
import SingleMessage, { SingleMessageProps } from 'base/single_message';
import { Context as AdminContext } from 'store/admin';
import { SingleContactProps } from 'base/single_contact';
import './index.scss';
import Mask from 'base/Mask';
import socketContainer from 'common/js/socketContainer';

export interface ChatProps {
  name: string;
  type: 'private'|'stranger'|'group';
  count?: number;
  messages?: SingleMessageProps[];
  notice?: string;
  id: string;
  avatar?: string;
  sendMsgCb?: (msg: SingleMessageProps)=>void;
}

function Chat(props: ChatProps) {

  const { state: admin } = useContext(AdminContext);
  const [showInfo, setShowInfo] = useState(false);
  const textEl = useRef<HTMLTextAreaElement>(null);

  function sendMsg(event: React.KeyboardEvent<HTMLDivElement>): void {
    if (event.keyCode === 13) {
      let msgContent = (textEl.current as HTMLTextAreaElement).value;
      (textEl.current as HTMLTextAreaElement).value = '';

      if (props.id === '-1' || !msgContent.trim()) {
        return;
      }
      
      let time = new Date().getTime() + '';
      let msg: SingleMessageProps = {
        senderName: admin.name,
        senderAvatar: admin.avatar,
        senderId: admin.id,

        receiverName: props.name,
        receiverId: props.id,
        receiverAvatar: props.avatar,

        type: props.type,
        time: time,
        msgId: admin.id + '/' + props.id + '/' + time,
        status: 'unread',
        content: msgContent,
        contentType: 'string',
      };
      if (props.type === 'group') {
        Object.assign(msg, {groupId: props.id, groupName: props.name, groupAvatar: props.avatar})
      }
      if (typeof props.sendMsgCb === 'function') {
        props.sendMsgCb(msg);
      }
      (socketContainer.socket as SocketIOClient.Socket).emit('msg', msg, (err: string) => {
        if (err) {
          console.log('send failed');
        } else {
          console.log('send successful');
        }
      })
    }
  }

  return (
    <div className={`chat ${props.id !== '-1' ? '' : 'hide'}`}>
      <div className='chat-header'>
        <p className='name'>{ `${props.name}${props.count ? '(' + props.count + ')' : ''}` }</p>
        <p className='iconfont icon'><i onClick={() => {setShowInfo(!showInfo)}} className={props.type === 'group' ? 'icon-group' : 'icon-user'}/></p>
      </div>
      <div className='chat-content'>
        {
          props.messages ? 
          <ul>
            {
              props.messages.map(msg => {
                let fromMe = msg.senderId === admin.id;
                return <li key={msg.msgId} className={fromMe ? 'from-me' : 'from-others'}><SingleMessage {...msg} fromMe={fromMe}></SingleMessage></li>
              })
            }
          </ul> : ''
        }
      </div>
      <div className='chat-input' onKeyUp={sendMsg}>
          <div className='tool-list'></div>
          <textarea ref={textEl}></textarea>
      </div>
      <div className={`information-wrapper ${showInfo ? 'show' : 'hide'}`}>
        <Mask cb={() => {setShowInfo(false)}}></Mask>
        <ChatInformation type={props.type} name={props.name} notice={props.notice} id={props.id} avatar={props.avatar}></ChatInformation>
      </div>
    </div>
  )
}

export default Chat;