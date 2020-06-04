import Router from 'koa-router'
import commodity from '../controllers/commodity'

let router = new Router({
  prefix: '/commodity'
})

/***********商品接口***********/

router.get('/getOne', commodity.getOne)         // 获取一篇商品（商品详情）
      .get('/getByType', commodity.getByType)   // 根据类型获取商品
      .get('/getAll', commodity.getAll)         // 获取所有商品（分页获取）
      .post('/add', commodity.add)              // 管理员添加商品
      .put('/update', commodity.update)         // 管理员更新商品
      .delete('/delete', commodity.delete)      // 删除商品
      .post('/view', commodity.view)            // 浏览+1
      .post('/like', commodity.like)            // 点赞+1
      .post('/collect', commodity.collect)      // 收藏+1
      .post('/comment', commodity.comment)      // 评论

export default router