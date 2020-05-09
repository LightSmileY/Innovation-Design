import Router from 'koa-router'
import admin from '../controllers/admin'

let router = new Router({
  prefix: '/admin'
})

/***********管理员接口***********/

// router.post('/signup', admin.signup)            // 添加管理员
//       .post('/signin', admin.signin)            // 登录
//       .get('/exit', admin.exit)                 // 退出登录
//       .get('/getOne', admin.getUserByUsername)  // 获取一位管理员
//       .get('/getAll', admin.getAllUsers)        // 获取所有管理员
//       .put('/update', admin.updateUser)        // 更新管理员资料
//       .post('/access', admin.access)            // 设置管理员权限
//       .delete('/delete', admin.deleteUser)        // 注销管理员

export default router