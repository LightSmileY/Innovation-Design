import Router from 'koa-router'
import user from '../controllers/user'

let router = new Router({
  prefix: '/user'
})

/***********用户接口***********/

// router.post('/signup', user.signup)           // 注册
//       .get('/signin', user.signin)            // 登录
//       .get('/verify', user.verify)            // 请求验证码
//       .get('/exit', user.exit)                // 退出登录
//       .get('/getOne', user.getUserByUsername) // 获取一位用户
//       .get('/getAll', user.getAllUsers)       // 获取所有用户
//       .post('/add', user.addUser)             // 添加用户
//       .put('/update', user.updateUser)        // 更新用户
//       .delete('/delete', user.deleteUser)     // 删除用户
//       .post('/colectArticle', user.colectArticle)                   // 用户收藏文章
//       .post('/colectCommodity', user.colectCommodity)               // 用户收藏医疗用品
//       .post('/unColectArticle', user.unColectArticle)               // 用户取消收藏文章
//       .post('/unColectCommodity', user.unColectCommodity)           // 用户取消收藏商品
//       .get('/getArticleColections', user.getArticleColections)      // 获取用户收藏的文章
//       .get('/getCommodityColections', user.getCommodityColections)  // 获取用户收藏的医疗用品

export default router