import React from 'react';

export interface SingleMessageProps {
  senderName: string;
  senderAvatar?: string;
  senderId: string;

  receiverName: string;
  receiverAvatar: string;
  receiverId: string;

  content: string;
  contentType: string;

  
  type: 'group' | 'private';
  time: string;
  status: string;


}

function SingleMessage() {

}
export default SingleMessage;