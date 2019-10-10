export interface SigninAck {
  result: boolean;
  msg: string;
  admin?: Admin;
  friends?: UserFriend[];
  groups?: UserGroup[];

}

export interface SignupAck {
  code: -1 | 0 | 1;
  msg: string;
}

export interface Admin {
  name: string;
  id: number;
  avatar?: string;
  time?: string;
  slogan: string;
  type: 'private';
}

export interface UserProps {
  id: number;
  name: string;
  password: string;
  avatar: string;
  slogan: string;
  signup_time: any;
}

export interface UserGroup {
  id: number;
  name: string;
  avatar: string;
  notice: string;
}

export interface UserFriend {
  name: string;
  id: number;
  avatar: string;
  slogan: string;
}

export interface UserRecord {
  recordId: string;

  senderId: string;
  senderName: string;
  senderAvatar: string;

  receiverId: string;
  receiverName: string;
  reciverAvatar: string;

  type: string;
  handled: number;
  attachMsg: string;
}

export interface GroupMember {
  id: number;
  avatar: string;
  name: string;
}

export interface Msg {
  senderName: string;
  senderAvatar?: string;
  senderId: string;

  receiverName: string;
  receiverAvatar?: string;
  receiverId: string;

  content: string;
  contentType?: 'string';

  groupId?: string;
  groupName?: string;
  groupAvatar?: string;
  
  type: 'group' | 'private' | 'stranger';
  time: string;
  status: string;
  msgId: string;
  fromMe: boolean;
  index?: string; // 聊天索引
}

export interface OptMsg {
  actionType: "addFriend" | "deleteFriend" | "joinGroup" | "quitGroup" | "createGroup" | "requestAddFriend" | "responseAddFriend";
  userId?: string;
  targetId?: string;
  groupId?: string;
  groupInfo?: UserGroup;

  attachMsg?: string;
  recordId?: string;
  senderAvatar?: string;
  receiverAvatar?: string;
  senderName?: string;
  receiverName?: string;
  senderId?: string;
  receiverId?: string;
  type?: string;
}

export class UserList {
  public list: Map<string, User>;
  constructor(oldList) {
    this.list = oldList ? oldList : new Map();
  }
  findUser(id: string) {
    id = String(id);
    return this.list.get(id);
  }
  addUserSocket(userId: string, socket: SocketIO.Socket) {
    userId = String(userId);
    this.list.has(userId) || this.list.set(userId, new User());
    this.list.get(userId).insertSocket(socket);
  }
  deleteUserSocket(userId: string, socket: SocketIO.Socket) {
    userId = String(userId);
    this.list.has(userId) && this.list.get(userId).deleteSocket(socket);
  }
  updateUser(id, user) {
    //同id，用user的信息和原user的信息进行合并
  }
}

export class User {
  public socketList: SocketIO.Socket[];
  constructor() {
    this.socketList = [];
  }
  findSocket(socket: SocketIO.Socket) {
    const id: string = socket.id;
    return this.socketList.find(item => item.id === id);
  }
  insertSocket(socket:SocketIO.Socket) {
    const id: string = socket.id;
    let index = this.socketList.findIndex(item => item.id === id);
    index === -1 ? this.socketList.push(socket) : this.socketList.splice(index, 1, socket);
    console.log('index: ', index, 'length: ', this.socketList.length, 'socketId: ', id);
  }
  deleteSocket(socket: SocketIO.Socket) {
    const id: string = socket.id;
    let index = this.socketList.findIndex(item => item.id === id);
    index > -1 && this.socketList.splice(index, 1);
  }
}

export class UserSocket {
  constructor(public userId, public sessionId, public socket) {
  }
}