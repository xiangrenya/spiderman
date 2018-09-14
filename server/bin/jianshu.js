const axios = require("axios");
const cheerio = require("cheerio");

const TARGET_URL = "https://www.jianshu.com";

axios.get(TARGET_URL).then(response => {
  const $ = cheerio.load(response.data);
  $("ul.note-list .title").each((index, elem) => {
    const text = $(elem).text();
    const href = $(elem).attr('href');
    const output = `${index}: <a href='${TARGET_URL + href}'>${text}</a>`;
    console.log(output);
  });
});