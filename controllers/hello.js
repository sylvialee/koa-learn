var fn_hello = async function(ctx, next){
  let name = ctx.params.name
  ctx.response.body = `<h1>hello, ${name}</h1>`

}

module.exports = {
  'get /hello/:name': fn_hello
}
