import * as fs from 'fs';
import * as sql from '../lib/mysql';
import { GroupMember, Admin, UserGroup, UserFriend, UserRecord } from '../config/interfaces';
import * as express from 'express';
const router = express.Router();

router.get('/group_member/:g_id', async(req, res) => {
  console.log('group_id:', req.params.g_id);
  let members = await sql.getGroupMember(req.params.g_id) as GroupMember[];
  res.json(members);
})

router.get('/init_info', async(req, res) => {
  let userId = req.query['user_id'];
  let ack: {admin: Admin, group: UserGroup[], friend: UserFriend[], record: UserRecord[]} = {admin: {name:'admin', id: -1, slogan:'wrong', type:'private'}, group: [], friend: [], record: []};
  await sql.getUserById(userId).then(data => {
    let tmp = data[0];
    console.log(JSON.stringify(tmp));
    ack.admin = {
      name: tmp.name,
      id: tmp.id,
      avatar: tmp.avatar,
      time: tmp.signup_time,
      slogan: tmp.slogan,
      type: 'private',
    }
  })
  let groups = await sql.getUserGroup(userId) as UserGroup[];
  let friends = await sql.getUserFriend(userId) as UserFriend[];
  let records = await sql.getRecords(userId) as UserRecord[];
  ack.group = groups;
  ack.friend = friends;
  ack.record = records;
  console.log(ack);
  res.json(ack);
})

router.get('/search', async(req, res) => {
  let keyword = req.query['keyword'];
  let userOfKeyword = await sql.getUserByKeyword(keyword);
  let groupOfKeyword = await sql.getGroupByKeyword(keyword);
  console.log({
    userOfKeyword,
    groupOfKeyword
  })
  res.json({
    userOfKeyword,
    groupOfKeyword,
  })
})

export default router;