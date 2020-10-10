import User from '../models/user'
import Medic from '../models/medic'
import Article from '../models/article'

export default {

  /*用户注册*/
  async signup(ctx, next) {
    const {
      wx_id,
      nickname,
      password,
      email,
      create_time
    } = ctx.request.body

    // 数据库中查找是否存在该账号
    let user = await User.findOne({
      wx_id
    })

    if (user) {
      ctx.body = {
        code: -1,
        msg: '抱歉，该用户名已被注册'
      }
      return
    }

    let newUser = await User.create({
      wx_id,
      nickname,
      password,
      email,
      create_time
    })
    if (newUser) {
      ctx.body = {
        code: 0,
        msg: '注册成功',
        user: newUser
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '注册失败'
      }
    }
  },

  /*用户登录*/
  async signin(ctx, next) {
    let {
      wx_id,
      password,
      last_login_time
    } = ctx.query

    let user = await User.findOne({
      wx_id
    })

    if (!user) {
      ctx.body = {
        code: -1,
        msg: '不存在该用户!'
      }
    } else if (user.password === password) {
      await User.updateOne({
        wx_id
      }, {
        last_login_time
      }, err => {
        if (err) {
          ctx.body = {
            code: -1,
            msg: '数据错误,登录失败'
          }
          return
        } else {
          ctx.body = {
            code: 0,
            msg: '登录成功',
            user
          }
        }
      })
    } else {
      ctx.body = {
        code: -1,
        msg: '密码错误!'
      }
    }
    return
  },

  /* 获取用户喜欢的文章 */
  async getLikedArticles(ctx, next) {
    let {
      wx_id
    } = ctx.query

    let user = await User.findOne({wx_id})

    if (user.articleLikes.length) {

      let likes = []

      for (let item of user.articleLikes) {
        let article = await Article.findOne({id: item.aid})
        article = JSON.parse((JSON.stringify(article)))

        article.likeCount = (await User.find({
          "articleLikes.aid": article.id
        })).length
        article.collectionCount = (await User.find({
          "articleCollections.aid": article.id
        })).length

        likes.push(article)
      }
      ctx.body = {
        code: 0,
        message: '获取成功',
        likedArticles: likes
      }
    } else {
      ctx.body = {
        code: -1,
        message: '喜欢的文章列表为空'
      }
    }
  },

  /* 获取用户收藏的文章 */
  async getCollectedArticles(ctx, next) {
    let {
      wx_id
    } = ctx.query

    let user = await User.findOne({wx_id})

    if (user.articleCollections.length) {

      let collections = []

      for (let item of user.articleCollections) {
        let article = await Article.findOne({id: item.aid})
        article = JSON.parse((JSON.stringify(article)))

        article.likeCount = (await User.find({
          "articleLikes.aid": article.id
        })).length
        article.collectionCount = (await User.find({
          "articleCollections.aid": article.id
        })).length

        collections.push(article)
      }
      ctx.body = {
        code: 0,
        message: '获取成功',
        collectedArticles: collections
      }
    } else {
      ctx.body = {
        code: -1,
        message: '收藏的文章列表为空'
      }
    }
  },

  /* 获取用户喜欢的药品 */
  async getLikedMedics(ctx, next) {
    let {
      wx_id
    } = ctx.query

    let user = await User.findOne({wx_id})

    if (user.medicLikes.length) {

      let likes = []

      for (let item of user.medicLikes) {
        let medic = await Medic.findOne({id: item.mid})
        medic = JSON.parse((JSON.stringify(medic)))

        medic.likeCount = (await User.find({
          "medicLikes.mid": medic.id
        })).length
        medic.collectionCount = (await User.find({
          "medicCollections.mid": medic.id
        })).length

        likes.push(medic)
      }
      ctx.body = {
        code: 0,
        message: '获取成功',
        likedMedics: likes
      }
    } else {
      ctx.body = {
        code: -1,
        message: '喜欢的药品列表为空'
      }
    }
  },

  /* 获取用户收藏的药品 */
  async getCollectedMedics(ctx, next) {
    let {
      wx_id
    } = ctx.query

    let user = await User.findOne({wx_id})

    if (user.medicCollections.length) {

      let collections = []

      for (let item of user.medicCollections) {
        let medic = await Medic.findOne({id: item.mid})
        medic = JSON.parse((JSON.stringify(medic)))

        medic.likeCount = (await User.find({
          "medicLikes.mid": medic.id
        })).length
        medic.collectionCount = (await User.find({
          "medicCollections.mid": medic.id
        })).length

        collections.push(medic)
      }
      ctx.body = {
        code: 0,
        message: '获取成功',
        likedMedics: collections
      }
    } else {
      ctx.body = {
        code: -1,
        message: '喜欢的药品列表为空'
      }
    }
  },

  /*获取所有用户*/
  async getAllUsers(ctx, next) {
    let users = await User.find()
    if (users.length) {
      ctx.body = {
        code: 0,
        msg: '获取成功',
        users
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '获取失败,用户表为空'
      }
    }
  },

  /*根据用户名查询一个用户*/
  async getUserByUsername(ctx, next) {
    let username = ctx.request.body.username
    let user = await User.findOne({
      wx_id
    })
    if (user) {
      ctx.body = {
        code: 0,
        msg: '查询成功',
        user
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '查询失败，不存在该用户'
      }
    }
  },

  /*添加用户*/
  async addUser(ctx, next) {
    let {
      wx_id,
      password,
      email,
      nickname,
      create_time,
      isAdmin
    } = ctx.request.body

    let user = await User.findOne({
      username
    })
    if (user) {
      ctx.body = {
        code: -1,
        msg: `已存在用户名为“${username}”的用户`
      }
      return
    }

    let newUser = await User.create({
      username,
      password,
      email,
      nickname,
      create_time,
      isAdmin
    })
    if (newUser) {
      ctx.body = {
        code: 0,
        msg: '创建成功',
        user: newUser
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '创建失败'
      }
    }
  },

  /*更新用户*/
  async updateUser(ctx, next) {
    let dataObj = ctx.request.body

    await User.updateOne({
      wx_id: dataObj.wx_id
    }, dataObj, (err, res) => {
      if (err) {
        ctx.body = {
          code: -1,
          msg: '更新失败'
        }
      } else {
        ctx.body = {
          code: 0,
          msg: '更新成功'
        }
      }
    })
  },

  /*删除用户*/
  async deleteUser(ctx, next) {
    let {wx_id} = ctx.query

    await User.remove({
      wx_id
    }, (err, res) => {
      if (err) {
        ctx.body = {
          code: -1,
          msg: '删除失败'
        }
      } else {
        ctx.body = {
          code: 0,
          msg: '删除成功'
        }
      }
    })
  },
}