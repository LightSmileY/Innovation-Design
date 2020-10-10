import Router from 'koa-router'
import disease from '../controllers/disease'

let router = new Router({
  prefix: '/disease'
})

/***********文章接口***********/

router.get('/getOne', disease.getOne)         // 获取一种疾病（文章详情）
      .get('/getAll', disease.getAll)         // 获取所有疾病（分页获取）
      .post('/add', disease.add)              // 管理员添加疾病
      .put('/update', disease.update)
      .delete('/delete', disease.delete)

export default router