"use strict";
exports.__esModule = true;
var mysql = require("mysql");
var default_1 = require("../config/default");
var pool = mysql.createPool({
    host: default_1.config.database.HOST,
    user: default_1.config.database.USERNAME,
    password: default_1.config.database.PASSWORD,
    database: default_1.config.database.DATABASE,
    port: default_1.config.database.PORT
});
var query = function (sql, values) {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err);
            }
            else {
                connection.query(sql, values, function (err, rows) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(rows);
                    }
                    connection.release();
                });
            }
        });
    });
};
var user = "create table if not exists user(\n  id INT NOT NULL AUTO_INCREMENT,\n  name VARCHAR(100) NOT NULL UNIQUE COMMENT '\u7528\u6237\u540D',\n  password VARCHAR(100) NOT NULL COMMENT '\u5BC6\u7801',\n  avatar VARCHAR(100) NOT NULL COMMENT '\u5934\u50CF',\n  signup_time TIMESTAMP NOT NULL COMMENT '\u6CE8\u518C\u65F6\u95F4',\n  slogan VARCHAR(100) COMMENT '\u4E2A\u6027\u7B7E\u540D',\n  PRIMARY KEY ( id )\n);";
var chat_group = "create table if not exists chat_group(\n  id INT NOT NULL AUTO_INCREMENT,\n  name VARCHAR(100) NOT NULL COMMENT '\u7FA4\u7EC4\u540D',\n  creator INT NOT NULL COMMENT '\u7FA4\u4E3B',\n  avatar VARCHAR(100) NOT NULL COMMENT '\u5934\u50CF',\n  create_time TIMESTAMP NOT NULL COMMENT '\u521B\u5EFA\u65F6\u95F4',\n  notice TEXT COMMENT '\u7FA4\u516C\u544A',\n  FOREIGN KEY (creator) REFERENCES user(id),\n  PRIMARY KEY ( id )\n);";
var offline_msg = "create table if not exists offline_msg(\n      id INT NOT NULL AUTO_INCREMENT,\n      time TIMESTAMP NOT NULL COMMENT '\u53D1\u9001\u65F6\u95F4',\n      sender_name VARCHAR(100) NOT NULL,\n      sender_id INT NOT NULL COMMENT '\u53D1\u9001\u7528\u6237ID',\n      sender_avatar VARCHAR(100) NOT NULL COMMENT '\u53D1\u9001\u4EBA\u5934\u50CF',\n      receiver_id INT NOT NULL COMMENT '\u63A5\u6536\u7528\u6237ID',\n      group_id INT COMMENT '\u7FA4ID',\n      group_name VARCHAR(100),\n      group_avatar VARCHAR(100) COMMENT '\u7FA4\u5934\u50CF',\n      type VARCHAR(100) NOT NULL COMMENT '\u6D88\u606F\u7C7B\u578B',\n      content TEXT COMMENT '\u6587\u672C\u6D88\u606F\u5185\u5BB9',\n      content_type VARCHAR(100) NOT NULL COMMENT '\u6D88\u606F\u5185\u5BB9\u6570\u636E\u7C7B\u578B',\n      msg_id VARCHAR(100) NOT NULL COMMENT '\u6D88\u606Fid',\n      FOREIGN KEY(sender_id) REFERENCES user(id)\n      ON UPDATE CASCADE\n      ON DELETE CASCADE,\n      PRIMARY KEY ( id )\n    );";
var user2group = "create table if not exists user2group(\n      id INT NOT NULL AUTO_INCREMENT,\n      user_id INT,\n      group_id INT,\n      join_time TIMESTAMP NOT NULL COMMENT '\u52A0\u5165\u65F6\u95F4',\n      FOREIGN KEY(user_id) REFERENCES user(id)\n      ON UPDATE CASCADE\n      ON DELETE CASCADE,\n      FOREIGN KEY(group_id) REFERENCES chat_group(id)\n      ON UPDATE CASCADE\n      ON DELETE CASCADE,\n      PRIMARY KEY ( id ),\n      UNIQUE (user_id, group_id)\n    );";
var user2user = "create table if not exists user2user(\n      id INT NOT NULL AUTO_INCREMENT,\n      user_id INT,\n      friend_id INT,\n      add_time TIMESTAMP NOT NULL COMMENT '\u6DFB\u52A0\u65F6\u95F4',\n      FOREIGN KEY(user_id) REFERENCES user(id)\n      ON UPDATE CASCADE\n      ON DELETE CASCADE,\n      FOREIGN KEY(friend_id) REFERENCES user(id)\n      ON UPDATE CASCADE\n      ON DELETE CASCADE,\n      PRIMARY KEY ( id ),\n      UNIQUE (user_id, friend_id)\n    );";
var records = "create table if not exists records(\n      id INT NOT NULL AUTO_INCREMENT,\n      user_id INT NOT NULL COMMENT '\u62E5\u6709\u8005ID',\n      record_id VARCHAR(100) NOT NULL COMMENT '\u8BB0\u5F55ID',\n      time TIMESTAMP NOT NULL COMMENT '\u53D1\u9001\u65F6\u95F4',\n      sender_id INT NOT NULL COMMENT '\u53D1\u9001\u7528\u6237ID',\n      receiver_id INT NOT NULL COMMENT '\u63A5\u6536\u7528\u6237ID',\n      sender_name VARCHAR(100) NOT NULL,\n      sender_avatar VARCHAR(100) NOT NULL,\n      receiver_name VARCHAR(100) NOT NULL,\n      receiver_avatar VARCHAR(100) NOT NULL,\n      type VARCHAR(100) NOT NULL COMMENT '\u6D88\u606F\u7C7B\u578B',\n      handled INT NOT NULL COMMENT '\u6D88\u606F\u662F\u5426\u5DF2\u5904\u7406(1|0)',\n      attachMsg TEXT COMMENT '\u9644\u52A0\u6D88\u606F',\n      FOREIGN KEY(sender_id) REFERENCES user(id)\n      ON UPDATE CASCADE\n      ON DELETE CASCADE,\n      FOREIGN KEY(receiver_id) REFERENCES user(id)\n      ON UPDATE CASCADE\n      ON DELETE CASCADE,\n      FOREIGN KEY(user_id) REFERENCES user(id)\n      ON UPDATE CASCADE\n      ON DELETE CASCADE,\n      PRIMARY KEY ( id )\n    );";
var createTable = function (sql) {
    return query(sql, []);
};
createTable(user).then(function (data) {
    console.log(data);
})["catch"](function (err) { console.log(err); });
createTable(chat_group).then(function (data) {
    console.log(data);
})["catch"](function (err) { console.log(err); });
createTable(user2group).then(function (data) {
    console.log(data);
})["catch"](function (err) { console.log(err); });
createTable(offline_msg).then(function (data) {
    console.log(data);
})["catch"](function (err) { console.log(err); });
createTable(user2user).then(function (data) {
    console.log(data);
})["catch"](function (err) { console.log(err); });
createTable(records).then(function (data) {
    console.log(data);
})["catch"](function (err) { console.log(err); });
var insertUser = function (value) {
    var _sql = "INSERT INTO user SET name=?, password=?, avatar=?, signup_time=?, slogan=?";
    return query(_sql, value);
};
exports.insertUser = insertUser;
var deleteUser = function (id) {
    var _sql = "DELETE FROM user WHERE id=" + id + ";";
    return query(_sql, []);
};
exports.deleteUser = deleteUser;
var getUserByName = function (name) {
    var _sql = "SELECT * FROM user WHERE name=\"" + name + "\";";
    return query(_sql, []);
};
exports.getUserByName = getUserByName;
var getUserById = function (id) {
    var _sql = "SELECT * FROM user WHERE id = " + id + ";";
    return query(_sql, []);
};
exports.getUserById = getUserById;
var getUserByKeyword = function (keyword) {
    var _sql = "SELECT id, name, avatar FROM user WHERE name LIKE \"%" + keyword + "%\";";
    return query(_sql, []);
};
exports.getUserByKeyword = getUserByKeyword;
var addFriend = function (userId, friendId, time) {
    var _sql = "INSERT INTO user2user (user_id, friend_id, add_time) VALUES (" + userId + ", " + friendId + ", " + time + "), (" + friendId + ", " + userId + ", " + time + ");";
    return query(_sql);
};
exports.addFriend = addFriend;
var deleteFriend = function (userId, targetId) {
    var _sql = "DELETE FROM user2user WHERE (user_id=\"" + userId + "\" AND friend_id=\"" + targetId + "\") OR (user_id=\"" + targetId + "\" AND friend_id=\"" + userId + "\");";
    return query(_sql);
};
exports.deleteFriend = deleteFriend;
var getUserFriend = function (id) {
    var _sql = "SELECT name, user.id, avatar, slogan FROM user2user, user WHERE user_id=\"" + id + "\" AND user.id=user2user.friend_id;";
    return query(_sql);
};
exports.getUserFriend = getUserFriend;
var createGroup = function (value) {
    var _sql = "INSERT INTO chat_group SET name=?,avatar=?,creator=?,create_time=?,notice=?;";
    return query(_sql, value);
};
exports.createGroup = createGroup;
var joinGroup = function (value) {
    var _sql = "INSERT INTO user2group SET user_id=?,group_id=?,join_time=?;";
    return query(_sql, value);
};
exports.joinGroup = joinGroup;
var getGroupMember = function (groupId) {
    var _sql = "SELECT user.id, avatar, name FROM user2group, user WHERE group_id=\"" + groupId + "\" AND user.id=user2group.user_id;";
    return query(_sql);
};
exports.getGroupMember = getGroupMember;
var getGroupByKeyword = function (keyword) {
    var _sql = "SELECT id, name, avatar, notice, creator FROM chat_group WHERE name LIKE \"%" + keyword + "%\";";
    return query(_sql);
};
exports.getGroupByKeyword = getGroupByKeyword;
var getUserGroup = function (userId) {
    var _sql = "SELECT chat_group.id, name, avatar, notice FROM user2group, chat_group WHERE user2group.user_id=\"" + userId + "\" AND chat_group.id=user2group.group_id;";
    return query(_sql);
};
exports.getUserGroup = getUserGroup;
var quitGroup = function (userId, groupId) {
    var _sql = "DELETE from user2group WHERE group_id=\"" + groupId + "\" AND user_id=\"" + userId + "\"";
    return query(_sql);
};
exports.quitGroup = quitGroup;
var insertOfflineMsg = function (value) {
    var _sql = "INSERT INTO offline_msg SET time=?,sender_id=?,sender_name=?,sender_avatar=?,receiver_id=?,type=?,content=?,content_type=?,group_id=?,group_name=?,group_avatar=?,msg_id=?;";
    return query(_sql, value);
};
exports.insertOfflineMsg = insertOfflineMsg;
var getOfflineMsg = function (userId) {
    var _sql = "SELECT * FROM offline_msg WHERE receiver_id=\"" + userId + "\" ORDER BY time";
    return query(_sql);
};
exports.getOfflineMsg = getOfflineMsg;
var clearOfflineMsg = function (userId) {
    var _sql = "DELETE FROM offline_msg WHERE receiver_id=\"" + userId + "\";";
    return query(_sql);
};
exports.clearOfflineMsg = clearOfflineMsg;
var insertRecord = function (value) {
    var _sql = "INSERT INTO records SET userId=?,time=?,record_id=?,sender_id=?,sender_avatar=?,sender_name=?,receiver_id=?,receiver_avatar=?,receiver_name=?,type=?,attachMsg=?,handled=?;";
    return query(_sql, value);
};
exports.insertRecord = insertRecord;
var deleteRecord = function (userId, recordId) {
    var _sql = "DELETE FROM records WHERE (record_id=" + recordId + ");";
    return query(_sql);
};
exports.deleteRecord = deleteRecord;
var clearRecord = function (userId) {
    var _sql = "DELETE FROM records WHERE (userId=" + userId + ");";
    return query(_sql);
};
exports.clearRecord = clearRecord;
var getRecords = function (userId) {
    var _sql = "SELECT * FROM records WHERE user_id = \"" + userId + "\";";
    return query(_sql);
};
exports.getRecords = getRecords;
var confirmRecord = function (recordId) {
    var _sql = "UPDATE records SET handled=\"1\" WHERE record_id=" + recordId + ";";
    return query(_sql);
};
exports.confirmRecord = confirmRecord;
