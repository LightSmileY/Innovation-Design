import Router from 'koa-router'
import user from '../controllers/user'

let router = new Router({
  prefix: '/user'
})

/***********用户接口***********/

router.post('/signup', user.signup)           // 注册
      .get('/signin', user.signin)            // 登录
      .get('/getOne', user.getUserByUsername) // 获取一位用户
      .get('/getAll', user.getAllUsers)       // 获取所有用户
      .post('/add', user.addUser)             // 添加用户
      .put('/update', user.updateUser)        // 更新用户
      .delete('/delete', user.deleteUser)     // 删除用户
      .get('/getLikedArticles', user.getLikedArticles)      // 获取用户喜欢的文章
      .get('/getLikedMedics', user.getLikedMedics)      // 获取用户喜欢的药品
      .get('/getCollectedArticles', user.getCollectedArticles)      // 获取用户收藏的文章
      .get('/getCollectedMedics', user.getCollectedMedics)      // 获取用户收藏的药品

export default router