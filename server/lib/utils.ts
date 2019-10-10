import { UserSocket, Msg, GroupMember, OptMsg } from '../config/interfaces';
import { onlineList } from '../store/store';
import * as sql from '../lib/mysql';

function formatDate(date: Date): string {
  let [y, m, d, h, min, s] = [date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()];
  function toB(num) {
    return num < 10 ? '0' + num : '' + num;
  }
  return toB(y) + toB(m) + toB(d) + toB(h) + toB(min) + toB(s);
}

function initSocket(io: SocketIO.Server): void {
  io.on('connection', async (socket) => {
    console.log('new socket: ', socket.id);
    socket.emit('connect_confirm', {'msg': 'welcome'});
    socket.on('config_init', async(config) => {
      console.log(config);
      let userId = config.userId;
      if (userId !== -1) {
        onlineList.addUserSocket(userId, socket);
        socket.on('disconnect', () => {
          console.log('delete user: ', userId, ' socket: ', socket.id);
          onlineList.deleteUserSocket(userId, socket);
        })
        socket.on('logout', () => {
          console.log('delete user: ', userId, ' socket: ', socket.id);
          onlineList.deleteUserSocket(userId, socket);
        })
      }
    })
  
    socket.on('getOfflineMsg', async (userId, cb) => {
      let offlineMsg = await sql.getOfflineMsg(userId);
      if(typeof cb === 'function') {
        cb(offlineMsg);
      }
      //在读取完离线消息后应该从后台删除
    })
  
    socket.on('clearOfflineMsg', async(userId, cb) => {
      await sql.clearOfflineMsg(userId);
      if(typeof cb === 'function') {
        cb('clear');
      }
    })
    socket.on('msg', (msg, cb) => {
      sendMsg(msg);
      if(typeof cb === 'function') {
        cb(null);
      };
    })
  
    socket.on('opt', (msg, cb) => {
      try {
        dealOpt(msg).then(() => {
          if(typeof cb === 'function') {
            cb(null);
          }
        }).catch((e) => {
          console.log('1', e);
          if(typeof cb === 'function') {
            cb(e);
          }
        })
      } catch(err) {
        console.log('2', err);
        if(typeof cb === 'function') {
          cb(err);
        }
      }
    })
  
    socket.on('disconnect', () => {
      console.log(socket.id + ' disconnect')
    })
  })
}

function sendMsg(msg: Msg):void {
  switch(msg.type) {
    case 'private': 
      sendToPrivate(msg, msg.receiverId)
      break;
    case 'group':
      sendToGroup(msg, msg.receiverId)
      break;
  }
}

function sendToPrivate(msg: Msg, privateId: string) {
  let user = onlineList.findUser(privateId);
  if (user) {
    user.socketList.forEach(socket => {
      socket.emit('msg', msg);
    })
  } else {
    console.log('offline msg')
    //加入缓存信息,之后添加
    //sql.insertOfflineMsg([formatDate(new Date()), msg.senderId, msg.senderName, msg.senderAvatar, msg.receiverId, msg.type, msg.content, msg.contentType, msg.groupId, msg.groupName, msg.groupAvatar, msg.msgId]);
  }
}

function sendToGroup(msg: Msg, groupId: string) {
  let senderId = parseInt(msg.senderId);
  console.log('group id: ', groupId);
  sql.getGroupMember(groupId).then((list: GroupMember[]) => {
    list.forEach((member => {
      senderId !== member.id && sendToPrivate(msg, String(member.id));
    }))
  })
}

function addFriendReq(msg: OptMsg) {
  let user = onlineList.findUser(msg.targetId);
  if (user) {
    user.socketList.forEach(socket => {
      socket.emit('opt', {
        type: 'addFriendRequest',
        data: {...msg}
      });
    })
  }
  return Promise.all([sql.insertRecord([msg.userId, formatDate(new Date()), msg.recordId, msg.senderId, msg.senderAvatar, msg.senderName, msg.receiverId, msg.receiverAvatar, msg.receiverName, msg.type, 0]),
                      sql.insertRecord([msg.targetId, formatDate(new Date()), msg.recordId, msg.senderId, msg.senderAvatar, msg.senderName, msg.receiverId, msg.receiverAvatar, msg.receiverName, msg.type, 0])]);
}

function addFriendRes(msg: OptMsg) {
  let user = onlineList.findUser(msg.targetId);
  if (user) {
    user.socketList.forEach(socket => {
      socket.emit('opt', {
        type: 'addFriendResponse',
        data: {
          recordId: msg.recordId,
        }
      });
    })
  }
  return sql.confirmRecord(msg.recordId);
}

function addFriendDispatch(msg) {
  let user = onlineList.findUser(msg.targetId);
  if (user) {
    user.socketList.forEach(socket => {
      socket.emit('opt', {
        actionType: 'addFriend',
        senderName: msg.senderName,
        senderId: msg.senderId,
        senderAvatar: msg.senderAvatar,
      })
    })
  }
}

function deleteFriendDispatch(msg) {
  let user = onlineList.findUser(msg.targetId);
  if (user) {
    user.socketList.forEach(socket => {
      socket.emit('opt', {
        actionType: 'deleteFriend',
        senderId: msg.senderId,
      })
    })
  }
}

const dealOpt = function(msg: OptMsg) {
  switch(msg.actionType) {
    case 'addFriend':
      addFriendDispatch(msg);
      return sql.addFriend(msg.userId, msg.targetId, formatDate(new Date()));
    case 'deleteFriend':
      return sql.deleteFriend(msg.userId, msg.targetId);
    case 'joinGroup':
      return sql.joinGroup([msg.userId, msg.groupId, formatDate(new Date())]);
    case 'quitGroup':
      return sql.quitGroup(msg.userId, msg.groupId);
    case 'createGroup':
      return new Promise((resolve, reject) => {
        sql.createGroup([msg.groupInfo.name, msg.groupInfo.avatar, msg.userId, formatDate(new Date()), msg.groupInfo.notice]).then(data => {
          let insertId = -1
          data && (insertId = data.insertId);
          if (insertId > -1) {
            sql.joinGroup([msg.userId, insertId, formatDate(new Date())]).then((data) => {
              resolve(insertId)
            }).catch(e => reject(e))
          } else {
            reject('insertId <= -1')
          }
        }).catch(e => reject(e));
      })
    /* 
    添加好友需要验证，暂时不实现了
    case 'requestAddFriend':
      return addFriendReq(msg);
    case 'responseAddFriend':
      return addFriendRes(msg);
    */
    default:
      return Promise.reject('无效操作');
  }
}

export { formatDate, sendMsg, initSocket };