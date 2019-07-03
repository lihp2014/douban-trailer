const Router = require('koa-router')
const Movie = mongoose.model('Movie') 

const router = new Router()

router.get('/movies/all', async (ctx, next) => {
  const movies = await Movie.find({}).sort({
    'meta.createdAt': -1
  })

  ctx.body = {
    movies
  }
})

router.get('/movies/detail/:id', async (ctx, next) => {
  const Movie = mongoose.model('Movie')
  const id = ctx.params.id
  const movie = await Movie.findOne({ _id: id })

  ctx.body = {
    movie
  }
})

module.exports = router