"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var store_1 = require("../store/store");
var sql = require("../lib/mysql");
function formatDate(date) {
    var _a = [date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()], y = _a[0], m = _a[1], d = _a[2], h = _a[3], min = _a[4], s = _a[5];
    function toB(num) {
        return num < 10 ? '0' + num : '' + num;
    }
    return toB(y) + toB(m) + toB(d) + toB(h) + toB(min) + toB(s);
}
exports.formatDate = formatDate;
function initSocket(io) {
    var _this = this;
    io.on('connection', function (socket) { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            console.log('new socket: ', socket.id);
            socket.emit('connect_confirm', { 'msg': 'welcome' });
            socket.on('config_init', function (config) { return __awaiter(_this, void 0, void 0, function () {
                var userId;
                return __generator(this, function (_a) {
                    console.log(config);
                    userId = config.userId;
                    if (userId !== -1) {
                        store_1.onlineList.addUserSocket(userId, socket);
                        socket.on('disconnect', function () {
                            console.log('delete user: ', userId, ' socket: ', socket.id);
                            store_1.onlineList.deleteUserSocket(userId, socket);
                        });
                        socket.on('logout', function () {
                            console.log('delete user: ', userId, ' socket: ', socket.id);
                            store_1.onlineList.deleteUserSocket(userId, socket);
                        });
                    }
                    return [2 /*return*/];
                });
            }); });
            socket.on('getOfflineMsg', function (userId, cb) { return __awaiter(_this, void 0, void 0, function () {
                var offlineMsg;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, sql.getOfflineMsg(userId)];
                        case 1:
                            offlineMsg = _a.sent();
                            if (typeof cb === 'function') {
                                cb(offlineMsg);
                            }
                            return [2 /*return*/];
                    }
                });
            }); });
            socket.on('clearOfflineMsg', function (userId, cb) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, sql.clearOfflineMsg(userId)];
                        case 1:
                            _a.sent();
                            if (typeof cb === 'function') {
                                cb('clear');
                            }
                            return [2 /*return*/];
                    }
                });
            }); });
            socket.on('msg', function (msg, cb) {
                sendMsg(msg);
                if (typeof cb === 'function') {
                    cb(null);
                }
                ;
            });
            socket.on('opt', function (msg, cb) {
                try {
                    dealOpt(msg).then(function () {
                        if (typeof cb === 'function') {
                            cb(null);
                        }
                    })["catch"](function (e) {
                        console.log('1', e);
                        if (typeof cb === 'function') {
                            cb(e);
                        }
                    });
                }
                catch (err) {
                    console.log('2', err);
                    if (typeof cb === 'function') {
                        cb(err);
                    }
                }
            });
            socket.on('disconnect', function () {
                console.log(socket.id + ' disconnect');
            });
            return [2 /*return*/];
        });
    }); });
}
exports.initSocket = initSocket;
function sendMsg(msg) {
    switch (msg.type) {
        case 'private':
            sendToPrivate(msg, msg.receiverId);
            break;
        case 'group':
            sendToGroup(msg, msg.receiverId);
            break;
    }
}
exports.sendMsg = sendMsg;
function sendToPrivate(msg, privateId) {
    var user = store_1.onlineList.findUser(privateId);
    if (user) {
        user.socketList.forEach(function (socket) {
            socket.emit('msg', msg);
        });
    }
    else {
        console.log('offline msg');
        //加入缓存信息,之后添加
        //sql.insertOfflineMsg([formatDate(new Date()), msg.senderId, msg.senderName, msg.senderAvatar, msg.receiverId, msg.type, msg.content, msg.contentType, msg.groupId, msg.groupName, msg.groupAvatar, msg.msgId]);
    }
}
function sendToGroup(msg, groupId) {
    var senderId = parseInt(msg.senderId);
    console.log('group id: ', groupId);
    sql.getGroupMember(groupId).then(function (list) {
        list.forEach((function (member) {
            senderId !== member.id && sendToPrivate(msg, String(member.id));
        }));
    });
}
function addFriendReq(msg) {
    var user = store_1.onlineList.findUser(msg.targetId);
    if (user) {
        user.socketList.forEach(function (socket) {
            socket.emit('opt', {
                type: 'addFriendRequest',
                data: __assign({}, msg)
            });
        });
    }
    return Promise.all([sql.insertRecord([msg.userId, formatDate(new Date()), msg.recordId, msg.senderId, msg.senderAvatar, msg.senderName, msg.receiverId, msg.receiverAvatar, msg.receiverName, msg.type, 0]),
        sql.insertRecord([msg.targetId, formatDate(new Date()), msg.recordId, msg.senderId, msg.senderAvatar, msg.senderName, msg.receiverId, msg.receiverAvatar, msg.receiverName, msg.type, 0])]);
}
function addFriendRes(msg) {
    var user = store_1.onlineList.findUser(msg.targetId);
    if (user) {
        user.socketList.forEach(function (socket) {
            socket.emit('opt', {
                type: 'addFriendResponse',
                data: {
                    recordId: msg.recordId
                }
            });
        });
    }
    return sql.confirmRecord(msg.recordId);
}
function addFriendDispatch(msg) {
    var user = store_1.onlineList.findUser(msg.targetId);
    if (user) {
        user.socketList.forEach(function (socket) {
            socket.emit('opt', {
                actionType: 'addFriend',
                senderName: msg.senderName,
                senderId: msg.senderId,
                senderAvatar: msg.senderAvatar
            });
        });
    }
}
function deleteFriendDispatch(msg) {
    var user = store_1.onlineList.findUser(msg.targetId);
    if (user) {
        user.socketList.forEach(function (socket) {
            socket.emit('opt', {
                actionType: 'deleteFriend',
                senderId: msg.senderId
            });
        });
    }
}
var dealOpt = function (msg) {
    switch (msg.actionType) {
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
            return new Promise(function (resolve, reject) {
                sql.createGroup([msg.groupInfo.name, msg.groupInfo.avatar, msg.userId, formatDate(new Date()), msg.groupInfo.notice]).then(function (data) {
                    var insertId = -1;
                    data && (insertId = data.insertId);
                    if (insertId > -1) {
                        sql.joinGroup([msg.userId, insertId, formatDate(new Date())]).then(function (data) {
                            resolve(insertId);
                        })["catch"](function (e) { return reject(e); });
                    }
                    else {
                        reject('insertId <= -1');
                    }
                })["catch"](function (e) { return reject(e); });
            });
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
};
