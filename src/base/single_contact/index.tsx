import React from 'react';
import './index.scss';

export interface SingleContactProps {
  avatar?: string;
  name: string;
  id: string;
  wechatId?: string;
  type: 'private' | 'stranger' | 'group';
}

function SingleContact(props: SingleContactProps) {

  return (
    <div className='single-contact' data-id={props.id}>
      <div className='avatar-wrapper' style={{ backgroundImage: props.avatar ? `url(${props.avatar})` : `url(http://gitoa.top:3050/static/img/default.jpg)` }}></div>
      <p className='name-wrapper'>{ props.name }</p>
    </div>
  )
}

export default SingleContact;