import * as fs from 'fs';
import * as sql from '../lib/mysql';
import { UserProps, SigninAck, UserGroup, UserFriend } from '../config/interfaces';

import * as express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  console.log('index.html');
  if (req.session.login) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.createReadStream('../build/index.html').pipe(res);
  } else {
    res.writeHead(302, {'Content-Type': 'text/html', 'location': '../signin'});
    res.end();
  }
})

router.get('/signin', (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  fs.createReadStream('../build/login.html').pipe(res);
})

router.post('/signin', async(req, res) => {
  let user = req.body.name;
  let password = req.body.password;
  let ack: SigninAck = {
    result: false,
    msg: '',
  };
  sql.getUserByName(user).then(async(data) => {
    if ((data as UserProps[]).length === 0) {
      ack.msg = '用户名不存在';
    } else {
      let tmp = (data[0] as UserProps);
      if (tmp.password === password) {
        ack.result = true;
        ack.msg = '登录成功';
        ack.admin = {
          name: user,
          id: tmp.id,
          avatar: tmp.avatar,
          time: tmp.signup_time,
          slogan: tmp.slogan,
          type: 'private',
        }
        let groups = await sql.getUserGroup(tmp.id);
        let friends = await sql.getUserFriend(tmp.id);
        ack.groups = (groups as UserGroup[]);
        ack.friends = (friends as UserFriend[]);
        console.log('ack: ', JSON.stringify(ack));
        req.session.login = true;
        req.session.userId = tmp.id;
        res.setHeader('set-cookie', `userId=${tmp.id}`)
      } else {
        ack.msg = '密码错误';
      }
    }
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(ack));
  }).catch((err) => {
    ack.msg = '服务器错误';
    ack.result = false;
    console.log(err)
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(ack));
  })
})

export default router;