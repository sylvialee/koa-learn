let fn_index = async function(ctx, next){
  ctx.response.body = `<h1>Index</h1>
    <form action="/login" method="post">
	<p>name: <input type="text" name="name"></p>
	<p>password: <input type="password" name="password"></p>
	<p><input type="submit" value="submit"></p>
    </form>
  `
}

let fn_login = async function(ctx, next){
  let name = ctx.request.body.name
  let password = ctx.request.body.password
  if(name === 'sylvia' && password === "2018"){
    ctx.response.body = `<h1>login success; welcome ${name}</h1>`
  }else{
    ctx.response.body = `<h1>login failed; <a href="/">try again</a><h1>`
  }

}

module.exports = {
  'get /': fn_index,
  'post /login': fn_login
}
