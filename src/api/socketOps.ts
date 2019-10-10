import socketContainer from 'common/js/socketContainer';
import admin from 'store/admin';

export const joinGroup = (adminId: string, groupId: string) => {
  return new Promise((resolve, reject) => {
    (socketContainer.socket as SocketIOClient.Socket).emit('opt', {
      actionType: 'joinGroup',
      userId: adminId,
      groupId,
    }, (err: string) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    })
  })
}

export const addFriend = (adminId: string, targetId: string, senderName: string, senderAvatar?: string) => {
  return new Promise((resolve, reject) => {
    (socketContainer.socket as SocketIOClient.Socket).emit('opt', {
      actionType: 'addFriend',
      userId: adminId,
      targetId,
      senderId: adminId,
      senderName,
      senderAvatar,
    }, (err: string) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    })
  })
}