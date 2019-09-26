import React, { useContext } from 'react';
import InfoCard from 'base/info_card';
import { Context } from 'store/contact_card';

function ContactCard() {

  const { state } = useContext(Context);

  return (
    <InfoCard {...state} operation = { state.type === 'user' ? '删除好友' : '退出群聊'}></InfoCard>
  )
}

export default ContactCard;