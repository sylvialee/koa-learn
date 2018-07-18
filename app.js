const koa = require('koa')

// koa-router返回的是函数
// const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')
// const fs = require('fs')
const app = new koa()
const controller = require('./controller')
const templating = require('./templating')
const isProduction = process.env.NODE_ENV === 'production'

// 输出请求时间记录
app.use(async (ctx, next) => {
  console.log(`process ${ctx.request.method} ${ctx.request.url}...`)
  let startTime = +new Date()
  let execTime = 0
  await next();

  execTime = (new Date() - startTime)
  ctx.response.set('x-response-time', `${execTime}ms`)
})

// 判断环境
if( !isProduction ){
  let staticFiles = require('./static-files')
  app.use(staticFiles('/static', __dirname + '/static'))
}

// 解析POST请求body
app.use(bodyParser())


// 给ctx增加render方法
app.use(templating('view', {
  nocache: !isProduction,
  watch: !isProduction
}))

// 解析页面路由
app.use(controller())

// 监听接口
app.listen(3200)
console.log('app started at port 3200...')
