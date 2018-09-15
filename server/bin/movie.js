/* eslint-disable */

const request = require('superagent')
const charset = require('superagent-charset')
const cheerio = require('cheerio')
charset(request)

const SITE_URL = 'http://www.ygdy8.net'
const TITLE_URL = 'http://www.ygdy8.net/html/gndy/dyzz'
const API_URL = 'http://localhost:4000'

// 获取所有的标题
const getTitles = async (page = 1, pageCount = 0, titles = []) => {
  const url = `${TITLE_URL}/list_23_${page}.html`
  const { text } = await request.get(url).charset('gbk')
  const $ = cheerio.load(text, { decodeEntities: false })
  if (page === 1) {
    const lastPageHref = $('.x a')
      .last()
      .attr('href')
    pageCount = Number(
      lastPageHref
        .split('_')
        .pop()
        .split('.')[0]
    )
    console.log(`一共${pageCount}页`)
  }
  console.log(`正在获取第${page}页...`)
  $('.co_content8 .ulink').each((index, elem) => {
    const title = $(elem).text()
    const href = SITE_URL + $(elem).attr('href')
    titles.push({
      title,
      href
    })
    console.log(title)
  })
  if (page === pageCount) {
    return titles
  }
  page++
  return getTitles(page, pageCount, titles)
}

// 获取所有的磁力链接
const getBtLinks = async () => {
  const titles = await getTitles()
  const btLinks = []
  console.log('开始获取磁力链接...')
  for (const [index, item] of titles.entries()) {
    try {
      // 超时5s的请求就舍弃
      const { text } = await request
        .get(item.href)
        .charset('gbk')
        .timeout({
          response: 5000
        })
      const $ = cheerio.load(text, { decodeEntities: false })
      const href = $('#Zoom td a').attr('href')
      const $target = $('#Zoom > span > p')
      if ($target.length > 0) {
        console.log(`已获取 ：[${index}] ${item.title}`)
        const innerHtml = $target.first().html()
        let description = innerHtml
          .replace(/<strong>.*?<\/strong>/, '')
          .replace(/<a.*?<\/a>/, '')
        description = `<div>${description}</div>`
        btLinks.push({
          title: item.title,
          href,
          source: item.href,
          description
        })
      }
    } catch (err) {
      console.log(err)
    }
  }
  return btLinks
}

// 保存数据至数据库
const saveData = async () => {
  const btLinks = await getBtLinks()
  console.log('开始存入数据库...')
  for (const [index, bt] of btLinks.entries()) {
    request
      .post(`${API_URL}/api/movies`)
      .set('Accept', 'application/json')
      .send(bt)
      .then(() => {
        const print = `已保存：[${index}] ${bt.title}`
        console.log(print)
      })
      .catch(err => {
        console.log(err)
      })
  }
}

const main = () => {
  saveData()
}
main()
