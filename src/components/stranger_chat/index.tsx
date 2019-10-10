import React, { useContext } from 'react';
import Chat from 'base/chat';
import { Context } from 'store/stranger_chat';

function StrangerChat() {
  const { state } = useContext(Context)
  return (
    <Chat {...state}/>
  )
}

export default StrangerChat