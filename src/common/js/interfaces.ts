import { ReactNode } from "react";


export interface User {
  readonly id: string;
  name: string;
  slogan?: string;
  avatar?: string;
  location?: string;
  source?: string;
  gender?: 'boy'|'girl';
  wechatId?: string;
  type: 'user';
}

export interface Admin extends User {
  
}

export interface Group {
  readonly id: string;
  name: string;
  notice?: string;
  avatar?: string;
  readonly creator: string;
  type: 'group',
}

export interface ApplyRecord {
  applyType: string;
  attachMsg: string;
  time: string;
  sendByMe: boolean;
  handled: boolean;
  id: string;
  location?: string;
  wechatId?: string;
  type: 'record';

  senderId: string;
  senderName: string;
  senderAvatar: string;

  receiverId: string;
  receiverName: string;
  receiverAvatar: string;
}

export interface ProviderProps {
  readonly children: JSX.Element;
}