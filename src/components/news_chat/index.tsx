import React, { useContext, useEffect, useState } from 'react';
import Chat from 'base/chat';
import { Context } from 'store/news_chat';
import { Context as MessagesContext, MessageState } from 'store/messages';
import { Context as AdminContext } from 'store/admin';
import { Context as LastMsgContext } from 'store/last_message';
import { addMsgs } from 'store/messages/action';
import { updateLastMessage } from 'store/last_message/action';
import { SingleMessageProps } from 'base/single_message';

function NewsChat() {

  const { state } = useContext(Context)
  const { state: adminState } = useContext(AdminContext);
  const { state: msgState, dispatch } = useContext(MessagesContext);
  const { dispatch: lastMsgDispatch } = useContext(LastMsgContext);

  function sendMsgCb(msg: SingleMessageProps) {
    let chatId = state.type + state.id;
    dispatch(addMsgs(adminState.id, chatId, [msg]));
    lastMsgDispatch(updateLastMessage(msg, chatId));
  }

  useEffect(() => {
    dispatch(addMsgs(adminState.id, state.type + state.id, []))
  }, [state])

  return (
    <Chat {...state} messages={(msgState as MessageState)[state.type + state.id]} sendMsgCb={sendMsgCb}/>
  )
}

export default NewsChat