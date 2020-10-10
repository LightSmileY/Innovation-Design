import Disease from '../models/disease'
import { getTime, uuid } from '../assets/js/func'

export default {

  /*获取药品列表*/
  async getAll(ctx, next) {
    let diseaseList = await Disease.find()

    if (diseaseList.length) {
      // diseaseList = diseaseList.map(item => {
      //   return {
      //     id: item.id,
      //     name: item.name
      //   }
      // })
      ctx.status = 200
      ctx.body = {
        code: 0,
        msg: '获取成功',
        diseaseList
      }
    } else {
      ctx.status = 200
      ctx.body = {
        code: 0,
        msg: '列表为空'
      }
    }
  },

  /*获取药品详情*/
  async getOne(ctx, next) {
    let {
      id
    } = ctx.query

    let disease = await Disease.findOne({ id })

    if (disease) {
      ctx.status = 200
      ctx.body = {
        code: 0,
        msg: '查询成功',
        disease
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '不存在该文章'
      }
    }
  },

  /*添加疾病*/
  async add(ctx, next) {
    let dataObj = ctx.request.body
    dataObj.id = uuid()
    dataObj.create_time = getTime()

    let disease = await Disease.create(dataObj)

    if (disease) {
      ctx.status = 200
      ctx.body = {
        code: 0,
        msg: '添加成功',
        disease
      }
    } else {
      ctx.status = 200
      ctx.body = {
        code: -1,
        msg: '添加失败'
      }
    }
  },

  /*添加疾病*/
  async update(ctx, next) {
    let dataObj = ctx.request.body

    let disease = await Article.findOne({
      id: dataObj.id
    })
    if (disease) {
      await Article.updateOne({
        id: dataObj.id
      }, dataObj, (err, res) => {
        if (err) {
          ctx.status = 200
          ctx.body = {
            code: -1,
            msg: '更新失败'
          }
          return
        } else {
          ctx.status = 200
          ctx.body = {
            code: 0,
            msg: '更新成功'
          }
        }
      })
    }
  },

  /*删除疾病*/
  async delete(ctx, next) {
    let { id } = ctx.query

    await Disease.deleteOne({
      id
    }, err => {
      if (err) {
        ctx.status = 200
        ctx.body = {
          code: -1,
          msg: '删除失败'
        }
      } else {
        ctx.status = 200
        ctx.body = {
          code: 0,
          msg: '删除成功'
        }
      }
    })
  }
}