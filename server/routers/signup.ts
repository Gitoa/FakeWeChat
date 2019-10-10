import * as sql from '../lib/mysql';
import { SignupAck, UserProps } from '../config/interfaces';
import { formatDate } from '../lib/utils';
import * as express from 'express';

const router = express.Router();

router.post('/signup', async(req, res) => {
  let user = req.body.name;
  let password = req.body.password;
  let ack: SignupAck = {
    code: -1,
    msg: '',
  }
  try {
    let result = await sql.getUserByName(user) as UserProps[];
    if (result.length === 0) {
      try {
        let {insertId} = await sql.insertUser([user, password, '', formatDate(new Date()), 'NULL']) as {insertId: number, [propKey: string]: any};
        ack.code = 1;
        ack.msg = '注册成功';
        //同时加入到全体注册用户的群聊中
        await sql.joinGroup([insertId, 1, formatDate(new Date())])
      } catch (err) {
        ack.msg = err
      }
    } else {
      ack.msg = '用户名已存在';
    }
  } catch (err) {
    ack.msg = err;
  }
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(ack));
})

export default router;