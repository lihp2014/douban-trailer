const qiniu = require('qiniu')
const nanoid = require('nanoid')
const config = require('../config')

const bucket = config.qiniu.bucket
const mac = new qiniu.auth.digest.Mac(config.qiniu.AK, config.qiniu.SK)
const cfg = new qiniu.conf.Config()
const client = new qiniu.rs.BucketManager(mac, cfg)

const uploadToQiniu= async (url, key) => {
  return new Promise((resolve, reject) => {
    client.fetch(url, bucket, key, (err, ret, info) => {
      if (err) {
        reject(err)
      } else {
        if (info.statusCode === 200) {
          resolve({ key })
        } else {
          reject(info)
        }
      }
    })
  })
}

;(async () => {
  let movies = [{
    video: 'http://vt1.doubanio.com/201812041704/ca1ade81790827fbb3a6629d9231e61e/view/movie/M/402390838.mp4',
    doubanId: '27603700',
    cover: 'https://img1.doubanio.com/img/trailer/medium/2540984268.jpg',
    poster: 'https://img1.doubanio.com/view/photo/l_ratio_poster/public/p2540548908.jpg'
  }]

  movies.map(async movie => {
    if (movie.video && !movie.key) {
      try {
        console.log('开始上传video')
        let videoData = await uploadToQiniu(movie.video, nanoid() + '.mp4')
        console.log('开始上传cover')
        let coverData = await uploadToQiniu(movie.cover, nanoid() + '.png')
        console.log('开始上传poster')
        let posterData = await uploadToQiniu(movie.poster, nanoid() + '.png')

        if (videoData.key) {
          movie.videoKey = videoData.key
        }
        if (coverData.key) {
          movie.coverKey = coverData.key
        }
        if (posterData.key) {
          movie.posterKey = posterData.key
        }

        console.log(movie)
        {
          video: 'http://vt1.doubanio.com/201812041704/ca1ade81790827fbb3a6629d9231e61e/view/movie/M/402390838.mp4',
          doubanId: '27603700',
          cover: 'https://img1.doubanio.com/img/trailer/medium/2540984268.jpg',
          poster: 'https://img1.doubanio.com/view/photo/l_ratio_poster/public/p2540548908.jpg',
          videoKey: 'http://pj7v2wp6k.bkt.clouddn.com/ORc2w_cCJP1zBFvyM0aIU.mp4',
          coverKey: 'http://pj7v2wp6k.bkt.clouddn.com/CqdC0ZjHeU0fJYO6kfFoa.png',
          posterKey: 'http://pj7v2wp6k.bkt.clouddn.com/8wTCMq6X4HCZRmpssCLTw.png'
        }
      } catch (err) {
        console.log(err)
      }

    }
  })
})()
