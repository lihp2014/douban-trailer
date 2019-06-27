const puppeteer = require('puppeteer')

const base = `https://movie.douban.com/subject/`
const doubanId = '27603700'
const videoBase = `https://movie.douban.com/trailer/239838/#content`

const sleep = time => new Promise(resolve => {
  setTimeout(resolve, time)
})

// ;(async () => {
process.on('message', async movies => {

  console.log('start')

  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    dumpio: false
  })

  const page = await browser.newPage()

  for (let i = 0; i < movies.length; i++) {
    let doubanId = movies[i].doubanId

    await page.goto(base + doubanId, {
      waitUntil: 'networkidle2'
    })
  
    await sleep(1000)
  
    const result = await page.evaluate(() => {
      var $ = window.$
      var it = $('.related-pic-video')
  
      if (it && it.length) {
        var link = it.attr('href')
        var cover = it.css('background-image').replace('url("','').replace('?")','');
        return {
          link,
          cover
        }
      }
  
      return {}
    })
  
    let video
  
    if (result.link) {
      await page.goto(result.link, {
        waitUntil: 'networkidle2'
      })
      await sleep(2000)
  
      video = await page.evaluate(() => {
        var $ = window.$
        var it = $('source')
  
        if (it && it.length) {
          return it.attr('src')
        }
  
        return ''
      })
    }
  
    const data = {
      video,
      doubanId,
      cover: result.cover
    }
  
    console.log(data)
    process.send(data)
  }

  browser.close()
  process.exit(0)
  
})()