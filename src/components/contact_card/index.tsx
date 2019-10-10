import React, { useContext } from 'react';
import InfoCard from 'base/info_card';
import { Context } from 'store/contact_card';
import './index.scss';

function ContactCard() {

  const { state } = useContext(Context);

  return (
    <div className='contact-card'>
      <InfoCard {...state} operation={ state.type === 'private' ? '删除好友' : '退出群聊'}></InfoCard>
    </div>
  )
}

export default ContactCard;