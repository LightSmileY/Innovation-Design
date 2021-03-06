import Article from '../models/article'
import User from '../models/user'
import { getTime, uuid } from '../assets/js/func'

export default {

  /*获取药品列表*/
  async getAll(ctx, next) {
    let articleList = await Article.find()
    articleList = JSON.parse((JSON.stringify(articleList)))

    if (articleList.length) {
      for (let item of articleList) {
        item.likeCount = (await User.find({
          "articleLikes.aid": item.id
        })).length
        item.collectionCount = (await User.find({
          "articleCollections.aid": item.id
        })).length
      }
      ctx.status = 200
      ctx.body = {
        code: 0,
        msg: '获取成功',
        articleList
      }
    } else {
      ctx.status = 200
      ctx.body = {
        code: 0,
        msg: '列表为空'
      }
    }
  },

  /*获取药品列表*/
  async getByKey(ctx, next) {
    let {
      key
    } = ctx.query

    let reg = new RegExp(key)

    let articleList = await Article.find({title: {$regex: reg}})
    articleList = JSON.parse((JSON.stringify(articleList)))

    if (articleList.length) {
      for (let item of articleList) {
        item.likeCount = (await User.find({
          "articleLikes.aid": item.id
        })).length
        item.collectionCount = (await User.find({
          "articleCollections.aid": item.id
        })).length
      }
      ctx.status = 200
      ctx.body = {
        code: 0,
        msg: '获取成功',
        articleList
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
    let article = await Article.findOne({ id })
    article.viewCount++

    await Article.updateOne({
      id
    }, {
      viewCount: article.viewCount
    })

    article = JSON.parse((JSON.stringify(article)))

    if (article) {
      
      article.isLike = !!(await User.findOne({
        "wx_id": wx_id,
        "articleLikes.aid": id
      }))
      article.isCollection = !!(await User.findOne({
        "wx_id": wx_id,
        "articleCollections.aid": id
      }))
      article.likeCount = (await User.find({
        "articleLikes.aid": id
      })).length
      article.collectionCount = (await User.find({
        "articleCollections.aid": id
      })).length

      ctx.status = 200
      ctx.body = {
        code: 0,
        msg: '查询成功',
        article
      }
    } else {
      ctx.body = {
        code: 0,
        msg: '不存在该文章',
        article
      }
    }
  },

  /*添加商品*/
  async add(ctx, next) {
    let dataObj = ctx.request.body
    dataObj.id = uuid()
    dataObj.create_time = getTime()

    let article = await Article.findOne({
      id: dataObj.id
    })
    if (article) {
      ctx.body = {
        code: -1,
        msg: `已存在该文章`
      }
      return
    }
    /*将商品存入数据库*/
    let newArticle = await Article.create(dataObj)
    if (newArticle) {
      ctx.status = 200
      ctx.body = {
        code: 0,
        msg: '添加成功',
        article: newArticle
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
    let article = await Article.findOne({
      id: dataObj.id
    })
    if (article) {
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

  /*删除商品*/
  async delete(ctx, next) {
    let { id } = ctx.query
    await Article.deleteOne({
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
    let article = await Article.findOne({
      id
    })
    article.views++
    await Article.updateOne({
      id
    }, {
      views: article.views
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
    let article = await Article.findOne({id})

    if (user && article) {
      await User.updateOne({wx_id}, {
        $addToSet: {
          articleLikes: {
            aid: id
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
        msg: '用户或文章不存在'
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
        articleLikes: {
          aid: id
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
    let article = await Article.findOne({id})

    if (user && article) {
      await User.updateOne({wx_id}, {
        $addToSet: {
          articleCollections: {
            aid: id
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
        msg: '用户或文章不存在'
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
        articleCollections: {
          aid: id
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