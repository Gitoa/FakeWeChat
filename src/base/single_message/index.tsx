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
  
  type: 'group' | 'private';
  time: string;
  status: string;
}

function SingleMessage(props: SingleMessageProps) {

}

export default SingleMessage;