import React from 'react';
import './index.scss';

interface SingleRecordProps {
  senderName: string;
  senderAvatar: string;

  receiverName: string;
  receiverAvatar: string;

  sendByMe: boolean;
  attachMsg: string;
  handled: boolean;
  id: string;

}

function SingleRecord(props: SingleRecordProps) {
  let [ avatar, name ] = props.sendByMe ? [ props.receiverAvatar, props.receiverName ] : [ props.senderAvatar, props.senderName ];
  return (
    <div className='single-record' data-id={props.id}>
      <div className='avatar-wrapper' style={{backgroundImage: 'url(http://gitoa.top:3050/static/img/default.jpg)'}}></div>
      <div className='info-wrapper'>
        <div className='title-wrapper'>
          <p className='name'>{ name }</p>
          <p className='status'>{ props.handled ? '已处理' : '待处理' }</p>
        </div>
        <p className='attach-msg'>{ props.attachMsg }</p>
      </div>
    </div>
  )
}

export default SingleRecord;