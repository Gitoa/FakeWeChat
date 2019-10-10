import * as mysql from 'mysql';
import { config } from '../config/default';

const pool = mysql.createPool({
  host     : config.database.HOST,
  user     : config.database.USERNAME,
  password : config.database.PASSWORD,
  database : config.database.DATABASE,
  port     : config.database.PORT
})

const query = ( sql, values? ) => {

  return new Promise(( resolve, reject ) => {
    pool.getConnection( (err, connection) => {
      if (err) {
        reject( err )
      } else {
        connection.query(sql, values, ( err, rows) => {
          if ( err ) {
            reject( err )
          } else {
            resolve( rows )
          }
          connection.release()
        })
      }
    })
  })
}

let user = `create table if not exists user(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL UNIQUE COMMENT '用户名',
  password VARCHAR(100) NOT NULL COMMENT '密码',
  avatar VARCHAR(100) NOT NULL COMMENT '头像',
  signup_time TIMESTAMP NOT NULL COMMENT '注册时间',
  slogan VARCHAR(100) COMMENT '个性签名',
  PRIMARY KEY ( id )
);`

let chat_group = `create table if not exists chat_group(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL COMMENT '群组名',
  creator INT NOT NULL COMMENT '群主',
  avatar VARCHAR(100) NOT NULL COMMENT '头像',
  create_time TIMESTAMP NOT NULL COMMENT '创建时间',
  notice TEXT COMMENT '群公告',
  FOREIGN KEY (creator) REFERENCES user(id),
  PRIMARY KEY ( id )
);`

let offline_msg = 
    `create table if not exists offline_msg(
      id INT NOT NULL AUTO_INCREMENT,
      time TIMESTAMP NOT NULL COMMENT '发送时间',
      sender_name VARCHAR(100) NOT NULL,
      sender_id INT NOT NULL COMMENT '发送用户ID',
      sender_avatar VARCHAR(100) NOT NULL COMMENT '发送人头像',
      receiver_id INT NOT NULL COMMENT '接收用户ID',
      group_id INT COMMENT '群ID',
      group_name VARCHAR(100),
      group_avatar VARCHAR(100) COMMENT '群头像',
      type VARCHAR(100) NOT NULL COMMENT '消息类型',
      content TEXT COMMENT '文本消息内容',
      content_type VARCHAR(100) NOT NULL COMMENT '消息内容数据类型',
      msg_id VARCHAR(100) NOT NULL COMMENT '消息id',
      FOREIGN KEY(sender_id) REFERENCES user(id)
      ON UPDATE CASCADE
      ON DELETE CASCADE,
      PRIMARY KEY ( id )
    );`

let user2group = 
    `create table if not exists user2group(
      id INT NOT NULL AUTO_INCREMENT,
      user_id INT,
      group_id INT,
      join_time TIMESTAMP NOT NULL COMMENT '加入时间',
      FOREIGN KEY(user_id) REFERENCES user(id)
      ON UPDATE CASCADE
      ON DELETE CASCADE,
      FOREIGN KEY(group_id) REFERENCES chat_group(id)
      ON UPDATE CASCADE
      ON DELETE CASCADE,
      PRIMARY KEY ( id ),
      UNIQUE (user_id, group_id)
    );`

let user2user = 
    `create table if not exists user2user(
      id INT NOT NULL AUTO_INCREMENT,
      user_id INT,
      friend_id INT,
      add_time TIMESTAMP NOT NULL COMMENT '添加时间',
      FOREIGN KEY(user_id) REFERENCES user(id)
      ON UPDATE CASCADE
      ON DELETE CASCADE,
      FOREIGN KEY(friend_id) REFERENCES user(id)
      ON UPDATE CASCADE
      ON DELETE CASCADE,
      PRIMARY KEY ( id ),
      UNIQUE (user_id, friend_id)
    );`

let records = 
    `create table if not exists records(
      id INT NOT NULL AUTO_INCREMENT,
      user_id INT NOT NULL COMMENT '拥有者ID',
      record_id VARCHAR(100) NOT NULL COMMENT '记录ID',
      time TIMESTAMP NOT NULL COMMENT '发送时间',
      sender_id INT NOT NULL COMMENT '发送用户ID',
      receiver_id INT NOT NULL COMMENT '接收用户ID',
      sender_name VARCHAR(100) NOT NULL,
      sender_avatar VARCHAR(100) NOT NULL,
      receiver_name VARCHAR(100) NOT NULL,
      receiver_avatar VARCHAR(100) NOT NULL,
      type VARCHAR(100) NOT NULL COMMENT '消息类型',
      handled INT NOT NULL COMMENT '消息是否已处理(1|0)',
      attachMsg TEXT COMMENT '附加消息',
      FOREIGN KEY(sender_id) REFERENCES user(id)
      ON UPDATE CASCADE
      ON DELETE CASCADE,
      FOREIGN KEY(receiver_id) REFERENCES user(id)
      ON UPDATE CASCADE
      ON DELETE CASCADE,
      FOREIGN KEY(user_id) REFERENCES user(id)
      ON UPDATE CASCADE
      ON DELETE CASCADE,
      PRIMARY KEY ( id )
    );`

let createTable = (sql) => {
  return query(sql, []);
}

createTable(user).then((data) => {
  console.log(data);
}).catch((err) => {console.log(err)});

createTable(chat_group).then((data) => {
  console.log(data);
}).catch((err) => {console.log(err)});

createTable(user2group).then((data) => {
  console.log(data);
}).catch((err) => {console.log(err)});

createTable(offline_msg).then((data) => {
  console.log(data);
}).catch((err) => {console.log(err)});

createTable(user2user).then((data) => {
  console.log(data);
}).catch((err) => {console.log(err)});

createTable(records).then((data) => {
  console.log(data);
}).catch((err) => {console.log(err)});

const insertUser = (value) => {
  let _sql = "INSERT INTO user SET name=?, password=?, avatar=?, signup_time=?, slogan=?";
  return query(_sql, value);
}

const deleteUser = (id) => {
  let _sql = `DELETE FROM user WHERE id=${id};`;
  return query(_sql, []);
}

const getUserByName = (name) => {
  let _sql = `SELECT * FROM user WHERE name="${name}";`;
  return query(_sql, []);
}


const getUserById = (id) => {
  let _sql = `SELECT * FROM user WHERE id = ${id};`;
  return query(_sql, []);
}

const getUserByKeyword = (keyword) => {
  let _sql = `SELECT id, name, avatar FROM user WHERE name LIKE "%${keyword}%";`;
  return query(_sql, []);
}

const addFriend = (userId, friendId, time) => {
  let _sql = `INSERT INTO user2user (user_id, friend_id, add_time) VALUES (${userId}, ${friendId}, ${time}), (${friendId}, ${userId}, ${time});`;
  return query(_sql);
}

const deleteFriend = (userId, targetId) => {
  let _sql = `DELETE FROM user2user WHERE (user_id="${userId}" AND friend_id="${targetId}") OR (user_id="${targetId}" AND friend_id="${userId}");`;
  return query(_sql);
}

const getUserFriend = (id) => {
  let _sql = `SELECT name, user.id, avatar, slogan FROM user2user, user WHERE user_id="${id}" AND user.id=user2user.friend_id;`;
  return query(_sql);
}

const createGroup = (value) => {
  let _sql = "INSERT INTO chat_group SET name=?,avatar=?,creator=?,create_time=?,notice=?;";
  return query(_sql, value);
}

const joinGroup = (value) => {
  let _sql = "INSERT INTO user2group SET user_id=?,group_id=?,join_time=?;";
  return query(_sql, value);
}

const getGroupMember = (groupId) => {
  let _sql = `SELECT user.id, avatar, name FROM user2group, user WHERE group_id="${groupId}" AND user.id=user2group.user_id;`;
  return query(_sql);
}

const getGroupByKeyword = (keyword) => {
  let _sql = `SELECT id, name, avatar, notice, creator FROM chat_group WHERE name LIKE "%${keyword}%";`;
  return query(_sql);
}

const getUserGroup = (userId) => {
  let _sql = `SELECT chat_group.id, name, avatar, notice FROM user2group, chat_group WHERE user2group.user_id="${userId}" AND chat_group.id=user2group.group_id;`;
  return query(_sql);
}

const quitGroup = (userId, groupId) => {
  let _sql = `DELETE from user2group WHERE group_id="${groupId}" AND user_id="${userId}"`;
  return query(_sql);
}

const insertOfflineMsg = (value) => {
  let _sql = `INSERT INTO offline_msg SET time=?,sender_id=?,sender_name=?,sender_avatar=?,receiver_id=?,type=?,content=?,content_type=?,group_id=?,group_name=?,group_avatar=?,msg_id=?;`
  return query(_sql, value);
}

const getOfflineMsg = (userId) => {
  let _sql = `SELECT * FROM offline_msg WHERE receiver_id="${userId}" ORDER BY time`;
  return query(_sql);
}

const clearOfflineMsg = (userId) => {
  let _sql = `DELETE FROM offline_msg WHERE receiver_id="${userId}";`;
  return query(_sql);
}

const insertRecord = (value) => {
  let _sql = `INSERT INTO records SET userId=?,time=?,record_id=?,sender_id=?,sender_avatar=?,sender_name=?,receiver_id=?,receiver_avatar=?,receiver_name=?,type=?,attachMsg=?,handled=?;`;
  return query(_sql, value);
}

const deleteRecord = (userId: string, recordId: string) => {
  let _sql = `DELETE FROM records WHERE (record_id=${recordId});`;
  return query(_sql);
}

const clearRecord = (userId: string) => {
  let _sql = `DELETE FROM records WHERE (userId=${userId});`;
  return query(_sql);
}

const getRecords = (userId: string) => {
  let _sql = `SELECT * FROM records WHERE user_id = "${userId}";`;
  return query(_sql);
}

const confirmRecord = (recordId: string) => {
  let _sql = `UPDATE records SET handled="1" WHERE record_id=${recordId};`;
  return query(_sql);
}

export { insertUser, deleteUser, getUserByName, getUserById, getUserByKeyword, addFriend, deleteFriend, getUserFriend, createGroup, joinGroup, getGroupMember, getGroupByKeyword, getUserGroup, quitGroup, insertOfflineMsg, getOfflineMsg, clearOfflineMsg, insertRecord, deleteRecord, clearRecord, getRecords, confirmRecord };
