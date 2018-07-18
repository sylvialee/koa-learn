const fs = require('fs')

function addMapping(router, mapping){
  for(let url in mapping){
    if(url.startsWith('get ')){
      let path = url.substring(4)
      router.get(path, mapping[url])
    }else if(url.startsWith('post ')){
      let path = url.substring(5)
      router.post(path, mapping[url])
    }else{
      console.log(`invalid url: mapping ${url}`)
    }
  }
}

function addControllers(router, dir){
  console.log(dir)
  let files = fs.readdirSync(__dirname + '/' + dir)
  let js_files = files.filter(item => {
    return item.endsWith('js')
  })
  for(let f of js_files){
    let mapping = require(__dirname + '/controllers/' + f)
    addMapping(router, mapping)
  }
}


module.exports = function(dir){
  let controllers_dir = dir || 'controllers'
  let router = require('koa-router')()
console.log(controllers_dir)
  addControllers(router, controllers_dir)
  return router.routes()
}
