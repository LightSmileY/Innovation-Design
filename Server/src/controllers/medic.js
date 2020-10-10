import Medic from '../models/medic'
import User from '../models/user'
import { getTime, uuid } from '../assets/js/func'

export default {

  /*获取药品列表*/
  async getAll(ctx, next) {
    let medicList = await Medic.find()
    medicList = JSON.parse((JSON.stringify(medicList)))

    if (medicList.length) {
      for (let item of medicList) {
        item.likeCount = (await User.find({
          "medicLikes.mid": item.id
        })).length
        item.collectionCount = (await User.find({
          "medicCollections.mid": item.id
        })).length
      }
      ctx.status = 200
      ctx.body = {
        code: 0,
        msg: '获取成功',
        medicList
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
      wx_id,
      id
    } = ctx.query
    
    let medic = await Medic.findOne({ id })

    medic.viewCount++

    await Medic.updateOne({
      id
    }, {
      viewCount: medic.viewCount
    })

    medic = JSON.parse((JSON.stringify(medic)))

    if (medic) {
      medic.isLike = !!(await User.findOne({
        "wx_id": wx_id,
        "medicLikes.mid": id
      }))
      medic.isCollection = !!(await User.findOne({
        "wx_id": wx_id,
        "medicCollections.mid": id
      }))
      medic.likeCount = (await User.find({
        "medicLikes.mid": id
      })).length
      medic.collectionCount = (await User.find({
        "medicCollections.mid": id
      })).length
      ctx.status = 200
      ctx.body = {
        code: 0,
        msg: '查询成功',
        medic
      }
    } else {
      ctx.body = {
        code: 0,
        msg: '不存在该文章',
        medic
      }
    }
  },

  /*添加商品*/
  async add(ctx, next) {
    let dataObj = ctx.request.body
    dataObj.id = uuid()
    dataObj.create_time = getTime()

    let medic = await Medic.findOne({
      id: dataObj.id
    })
    if (medic) {
      ctx.body = {
        code: -1,
        msg: `已存在该商品`
      }
      return
    }
    /*将商品存入数据库*/
    let newMedic = await Medic.create(dataObj)
    if (newMedic) {
      ctx.status = 200
      ctx.body = {
        code: 0,
        msg: '添加成功',
        medic: newMedic
      }
    } else {
      ctx.status = 200
      ctx.body = {
        code: -1,
        msg: '发表失败'
      }
    }
  },

  /*更新商品*/
  async update(ctx, next) {
    let dataObj = ctx.request.body
    let medic = await Medic.findOne({
      id: dataObj.id
    })
    if (medic) {
      await Medic.updateOne({
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

  /*删除商品*/
  async delete(ctx, next) {
    let { id } = ctx.query
    await Medic.deleteOne({
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
  },

  /*查看该商品*/
  async view(ctx, next) {
    let id = ctx.request.body.id
    let medic = await Medic.findOne({
      id
    })
    medic.views++
    await Medic.updateOne({
      id
    }, {
      views: medic.views
    }, err => {
      if (err) {
        ctx.status = 200
        ctx.body = {
          code: -1,
          msg: '查看失败'
        }
      } else {
        ctx.status = 200
        ctx.body = {
          code: 0,
          msg: '查看成功'
        }
      }
    })
  },

  /*点赞该商品*/
  async like(ctx, next) {
    let {
      wx_id,
      id
    } = ctx.request.body

    let user = await User.findOne({wx_id})
    let medic = await Medic.findOne({id})

    if (user && medic) {
      await User.updateOne({wx_id}, {
        $addToSet: {
          medicLikes: {
            mid: id
          }
        }
      }, err => {
        if (err) {
          ctx.status = 200
          ctx.body = {
            code: -1,
            msg: '点赞失败'
          }
        } else {
          ctx.status = 200
          ctx.body = {
            code: 0,
            msg: '点赞成功'
          }
        }
      })
    } else {
        ctx.body = {
        code: -1,
        msg: '用户或药品不存在'
      }
    }
  },

  /* 取消点赞 */
  async cancelLike(ctx, next) {
    let {
      wx_id,
      id
    } = ctx.query

    await User.updateOne({
      wx_id
    }, {
      $pull: {
        medicLikes: {
          mid: id
        }
      }
    },
    err => {
      if (err) {
        ctx.status = 200
        ctx.body = {
          code: -1,
          msg: '取消点赞失败'
        }
      } else {
        ctx.status = 200
        ctx.body = {
          code: 0,
          msg: '取消点赞成功'
        }
      }
    })
  },

  /*收藏该商品*/
  async collect(ctx, next) {
    let {
      wx_id,
      id
    } = ctx.request.body

    let user = await User.findOne({wx_id})
    let medic = await Medic.findOne({id})

    if (user && medic) {
      await User.updateOne({wx_id}, {
        $addToSet: {
          medicCollections: {
            mid: id
          }
        }
      }, err => {
        if (err) {
          ctx.status = 200
          ctx.body = {
            code: -1,
            msg: '收藏失败'
          }
        } else {
          ctx.status = 200
          ctx.body = {
            code: 0,
            msg: '收藏成功'
          }
        }
      })
    } else {
        ctx.body = {
        code: -1,
        msg: '用户或药品不存在'
      }
    }
  },

  /* 取消收藏 */
  async cancelCollect(ctx, next) {
    let {
      wx_id,
      id
    } = ctx.query

    await User.updateOne({
      wx_id
    }, {
      $pull: {
        medicCollections: {
          mid: id
        }
      }
    },
    err => {
      if (err) {
        ctx.status = 200
        ctx.body = {
          code: -1,
          msg: '取消收藏失败'
        }
      } else {
        ctx.status = 200
        ctx.body = {
          code: 0,
          msg: '取消收藏成功'
        }
      }
    })
  }
}