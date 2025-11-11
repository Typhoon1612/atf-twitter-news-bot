import 'dotenv/config'
import Parser from 'rss-parser'
import { TwitterApi } from 'twitter-api-v2'

const parser = new Parser()

const client = new TwitterApi({
  appKey: process.env.API_KEY,
  appSecret: process.env.API_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_SECRET
})

let lastPosted = ''

async function fetchNews() {
  const feed = await parser.parseURL('https://news.google.com/rss/search?q=crypto&hl=en-US&gl=US&ceid=US:en')
  const item = feed.items[0]
  return item
}

async function run() {
  try {
    const news = await fetchNews()
    if (!news || news.title === lastPosted) return

    const post = `JUST IN: ${news.title}`
    await client.v2.tweet(post)

    lastPosted = news.title
    console.log('Posted:', post)
  } catch (e) {
    console.log('Error:', e)
  }
}

run()
setInterval(run, 180000)
