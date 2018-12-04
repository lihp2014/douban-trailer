// http://api.douban.com/v2/movie/subject/1764796

const rp = require('request-promise-native')

async function fetchMovie (item) {
  const url = `http://api.douban.com/v2/movie/subject/${item.doubanId}`

  const res = await rp(url)

  return res
}

;(async () => {
  let movies = [
    {
      doubanId: 30330688,
      title: '拯救圣诞记',
      poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2536607303.jpg'
    },
    {
      doubanId: 30135448,
      title: '罪案心理小组X',
      poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2539358930.jpg'
    }
  ]

  movies.map(async movie => {
    let movieData = await fetchMovie(movie)

    try {
      movieData = JSON.parse(movieData)
      console.log(movieData.summary)
    } catch (err) {
      console.log(err)
    }

    console.log(movieData)
  })
})()