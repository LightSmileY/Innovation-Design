import Router from 'koa-router'
import article from '../controllers/article'

let router = new Router({
  prefix: '/article'
})

/***********文章接口***********/

router.get('/getOne', article.getOne)         // 获取一篇文章（文章详情）
      .get('/getAll', article.getAll)         // 获取所有文章
      .get('/getByKey', article.getByKey)   // 根据类型获取文章
      .post('/add', article.add)              // 管理员添加文章
      .put('/update', article.update)         // 管理员更新文章
      .delete('/delete', article.delete)      // 删除文章
      .post('/view', article.view)            // 浏览+1
      .post('/like', article.like)            // 点赞+1
      .delete('/unlike', article.cancelLike)            // 点赞+1
      .post('/collect', article.collect)                // 收藏+1
      .delete('/uncollect', article.cancelCollect)      // 收藏+1

export default router