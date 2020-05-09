import Router from 'koa-router'
import article from '../controllers/article'

let router = new Router({
  prefix: '/article'
})

/***********文章接口***********/

// router.get('/getOne', article.getOne)         // 获取一篇文章（文章详情）
//       .get('/getAll', article.getAll)         // 获取所有文章（分页获取）
//       .post('/add', article.add)              // 管理员添加文章
//       .put('/update', article.update)         // 管理员更新文章
//       .delete('/delete', article.delete)      // 删除文章
//       .like('/like', article.like)            // 点赞+1
//       .collect('/collect', article.collect)   // 收藏+1
//       .view('/view', article.view)            // 浏览+1

export default router