const koa = require('koa')

const app = new koa()

app.use(async (ctx, next) => {
    await next()
    ctx.response.type = 'text/html'
    ctx.response.body = '<h1>hello sylvia</h1>'

})

app.listen(3200)
console.log('app started at port 3000...')
