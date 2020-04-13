import Koa from 'koa'
import json from 'koa-json'
import onerror from 'koa-onerror'
import bodyparser from 'koa-bodyparser'
import logger from 'koa-logger'
import mongoose from 'mongoose'
import cors from 'koa-cors'
import user from './routes/user'
import config from './config/config'

const app = new Koa()

// error handler
onerror(app)

// middlewares
app.use(cors())
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))


// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(user.routes())
app.use(user.allowedMethods())

// 连接MongoDB数据库
mongoose.connect(config.mongodb, {
  useNewUrlParser: true
})

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

console.log('Koa2服务正在3000端口运行...')

module.exports = app
