import * as express from 'express';
const router = express.Router();

router.get('/logout', async(req, res) => {
  let userId = req.query['user_id'];
  console.log('user id: ', userId);
  req.session.login = false;
  res.setHeader('set-cookie', 'userId=-1; max-age=0;');
  res.json({msg: "logout successed"});
  //还需要从socket列表中删除吗？确保页面在登出后进行一次页面跳转，就能完成socket关闭？
  //通过302 redirect实现跳转
})

export default router;