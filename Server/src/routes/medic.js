
import Router from 'koa-router'
import medic from '../controllers/medic'

let router = new Router({
  prefix: '/medic'
})

/***********药品接口***********/

router.get('/getOne', medic.getOne)         // 获取一个药品（商品详情）
      .get('/getAll', medic.getAll)         // 获取所有药品（分页获取）
      .post('/add', medic.add)              // 管理员添加药品
      .put('/update', medic.update)         // 管理员更新药品
      .delete('/delete', medic.delete)      // 删除商品
      .post('/like', medic.like)            // 点赞
      .delete('/unlike', medic.cancelLike)            // 点赞
      .post('/collect', medic.collect)                // 收藏
      .delete('/uncollect', medic.cancelCollect)      // 收藏
      

export default router

