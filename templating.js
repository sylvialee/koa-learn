function createEnv(path, opts){
  let autoescape = opts.autoescape === undefined ? true : opts.autoescape
  let noCache = opts.noCache || false
  let watch = opts.watch || false
  throwOnUndefined = opts.throwOnUndefined || false

  env = new nunjucks.Environment(
      new nunjucks.FileSystemLoader('views', {
        noCache: noCache,
        watch: watch
      }), {
        autoescape: autoescape,
        throwOnUndefined: throwOnUndefined
      })

  if(opts.filters){
    for(var f in opts.filters) {
      env.addFilter(f, opts.filters[f])
    }
  }

  return env
}

function templating(){
  var env = createEnv('views', {
    watch: true,
    filters: {
      hex: function(n){
        return '0x' + n.toString(16)
      }
    }
  })
}
  

module.exports = template
