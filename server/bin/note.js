/* eslint-disable */

const axios = require('axios')
const cheerio = require('cheerio')

const TARGET_URL =
  'https://www.jianshu.com/trending/weekly?utm_medium=index-banner-s&utm_source=desktop'
const BASE_URL = 'https://www.jianshu.com'
const API_URL = 'http://localhost:4000'

async function main() {
  const response = await axios.get(TARGET_URL)
  const $ = cheerio.load(response.data)
  const indexNotes = Array.from($('ul.note-list li')).map(item => ({
    author: $(item)
      .find('.nickname')
      .text(),
    title: $(item)
      .find('.title')
      .text(),
    like_count: Number(
      $(item)
        .find('.meta span')
        .text()
    ),
    comment_count: Number(
      $(item)
        .find('.nickname')
        .next()
        .text()
        .replace(/\\n/g, '')
        .trim()
    ),
    href:
      BASE_URL +
      $(item)
        .find('.title')
        .attr('href')
  }))
  let notes = []
  for (let [index, note] of indexNotes.entries()) {
    const response = await axios.get(note.href)
    const $ = cheerio.load(response.data)
    notes.push({
      ...note,
      content: $('.article .show-content')
        .html()
        .replace(/\\n/g, '')
        .trim()
    })
    console.log(`正在加载第${index + 1}篇文章：${note.title}`)
  }
  for (const [index, note] of notes.entries()) {
    axios
      .post(`${API_URL}/api/notes`, note)
      .then(() => console.log(`正在保存第${index + 1}篇文章：${note.title}`))
      .catch(err => {
        console.log(err)
      })
  }
}

main()
