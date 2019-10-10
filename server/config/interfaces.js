"use strict";
exports.__esModule = true;
var UserList = /** @class */ (function () {
    function UserList(oldList) {
        this.list = oldList ? oldList : new Map();
    }
    UserList.prototype.findUser = function (id) {
        id = String(id);
        return this.list.get(id);
    };
    UserList.prototype.addUserSocket = function (userId, socket) {
        userId = String(userId);
        this.list.has(userId) || this.list.set(userId, new User());
        this.list.get(userId).insertSocket(socket);
    };
    UserList.prototype.deleteUserSocket = function (userId, socket) {
        userId = String(userId);
        this.list.has(userId) && this.list.get(userId).deleteSocket(socket);
    };
    UserList.prototype.updateUser = function (id, user) {
        //同id，用user的信息和原user的信息进行合并
    };
    return UserList;
}());
exports.UserList = UserList;
var User = /** @class */ (function () {
    function User() {
        this.socketList = [];
    }
    User.prototype.findSocket = function (socket) {
        var id = socket.id;
        return this.socketList.find(function (item) { return item.id === id; });
    };
    User.prototype.insertSocket = function (socket) {
        var id = socket.id;
        var index = this.socketList.findIndex(function (item) { return item.id === id; });
        index === -1 ? this.socketList.push(socket) : this.socketList.splice(index, 1, socket);
        console.log('index: ', index, 'length: ', this.socketList.length, 'socketId: ', id);
    };
    User.prototype.deleteSocket = function (socket) {
        var id = socket.id;
        var index = this.socketList.findIndex(function (item) { return item.id === id; });
        index > -1 && this.socketList.splice(index, 1);
    };
    return User;
}());
exports.User = User;
var UserSocket = /** @class */ (function () {
    function UserSocket(userId, sessionId, socket) {
        this.userId = userId;
        this.sessionId = sessionId;
        this.socket = socket;
    }
    return UserSocket;
}());
exports.UserSocket = UserSocket;
