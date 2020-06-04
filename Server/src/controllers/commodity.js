import Commodity from '../models/commodity'

export default {

  /*获取所有商品*/
  async getAll(ctx, next) {
    let commodities = await Commodity.find()
    if (commodities.length) {
      ctx.status = 200
      ctx.body = {
        code: 0,
        msg: '获取成功',
        commodities
      }
    } else {
      ctx.status = 404
    }
  },

  /*根据id查询一个商品*/
  async getOne(ctx, next) {
    let {
      id
    } = ctx.query
    let commodity = await Commodity.findOne({
      id
    })
    if (commodity) {
      ctx.status = 200
      ctx.body = {
        code: 0,
        msg: '查询成功',
        commodity
      }
    } else {
      ctx.status = 404
    }
  },

  /*根据类型获取所有商品*/
  async getByType(ctx, next) {
    let {
      type
    } = ctx.query
    let commodities = await Commodity.find({
      type
    })
    if (commodities.length) {
      ctx.status = 200
      ctx.body = {
        code: 0,
        msg: '获取成功',
        commodities
      }
    } else {
      ctx.status = 404
    }
  },

  /*管理员添加商品*/
  async add(ctx, next) {
    let dataObj = ctx.request.body

    let commodity = await Commodity.findOne({
      cid: dataObj.cid
    })
    if (commodity) {
      ctx.body = {
        code: -1,
        msg: `已存在title为“${title}”的文章`
      }
      return
    }
    /*将商品存入数据库*/
    let newCommodity = await Commodity.create({
      dataObj
    })
    if (newCommodity) {
      ctx.status = 200
      ctx.body = {
        code: 0,
        msg: '发表成功',
        commodity: newCommodity
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
    let {
      id,
      title,
      type,
      body,
      images,
      update_time
    } = ctx.request.body
    let commodity = await Commodity.findOne({
      title
    })
    await Commodity.updateOne({
      id
    }, {
      title,
      type,
      body,
      images,
      update_time
    }, (err, res) => {
      if (err) {
        ctx.status = 200
        ctx.body = {
          code: -1,
          msg: '更新失败'
        }
        return
      }
    })
    let newCommodity = await Commodity.findOne({
      title
    })
    ctx.status = 200
    ctx.body = {
      code: 0,
      msg: '更新成功',
      commodity: newCommodity
    }
  },

  /*删除商品*/
  async delete(ctx, next) {
    await Commodity.remove({
      title
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
    let cid = ctx.request.body.cid
    let commodity = await Commodity.findOne({
      id
    })
    commodity.views++
    await Commodity.updateOne({
      cid
    }, {
      views: commodity.views
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
      weid,
      cid
    } = ctx.request.body
    await Commodity.updateOne({
        cid
      }, {
        $addToSet: {
          likes: {
            weid
          }
        }
      },
      err => {
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
  },

  /*收藏该商品*/
  async collect(ctx, next) {
    let {
      weid,
      cid
    } = ctx.request.body
    await Commodity.updateOne({
        cid
      }, {
        $addToSet: {
          collections: {
            weid
          }
        }
      },
      err => {
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
  },

  /*评论该商品*/
  async comment(ctx, next) {
    let {
      weid,
      cid,
      comment,
      time
    } = ctx.request.body
    await Commodity.updateOne({
        cid
      }, {
        $addToSet: {
          comments: {
            weid,
            comment,
            time
          }
        }
      },
      err => {
        if (err) {
          ctx.status = 200
          ctx.body = {
            code: -1,
            msg: '评论失败'
          }
        } else {
          ctx.status = 200
          ctx.body = {
            code: 0,
            msg: '评论成功'
          }
        }
      })
  }
}