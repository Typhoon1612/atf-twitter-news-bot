# ATF Twitter News Bot

An automated bot that fetches news from RSS feeds, optionally rephrases headlines using OpenAI's GPT models, and posts updates to X (Twitter).

## Features

- 📰 **RSS Feed Integration**: Fetches the latest news from configured RSS feeds (e.g., CryptoNews).
- 🤖 **AI Rephrasing** (Optional): Uses OpenAI API to rephrase headlines for better engagement and to avoid duplicates.
- 🐦 **Automated Tweeting**: Posts updates directly to your Twitter account.
- ⏱️ **Scheduled Posts**: Runs periodically (configured for every 24 hours by default).
- 💓 **Keep-Alive Mechanism**: Includes a basic HTTP server to keep the bot running on hosting platforms like Render.

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- A Twitter Developer account with **Read and Write** permissions.
- (Optional) An OpenAI API key for rephrasing.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Typhoon1612/atf-twitter-news-bot.git
   cd atf-twitter-news-bot
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

### 1. Environment Variables

Create a `.env` file in the root directory by copying the example or creating it manually:

```bash
touch .env
```

Add the following variables to `.env`:

```env
# Twitter/X API Credentials
API_KEY=your_consumer_key
API_SECRET=your_consumer_key_secret
ACCESS_TOKEN=your_access_token
ACCESS_SECRET=your_access_token_secret

# OpenAI API Key (Optional)
OPENAI_API_KEY=your_openai_api_key

# Hosting Configuration (Optional)
# URL of your deployed app (used for self-pinging to prevent sleep)
RENDER_EXTERNAL_URL=https://your-app-name.onrender.com
PORT=10000
```

### 2. Data Configuration (`myData.json`)

Edit `myData.json` to customize your RSS feeds and tweet prefixes.

```json
{
  "startWord": ["NEWS FLASH: ", "JUST IN: ", "CRYPTO UPDATE: "],
  "newsAPIKeys": ["https://cryptonews.com/news/feed/"]
}
```

- **startWord**: A list of prefixes randomly chosen for each tweet.
- **newsAPIKeys**: A list of RSS feed URLs to source news from.

## Usage

Start the bot:

```bash
npm run start
```

The bot will:

1. Start a simple HTTP server (useful for health checks).
2. Fetch the latest item from a random RSS feed in `myData.json`.
3. Check if the news has already been posted.
4. Process the headline (add prefix and optionally rephrase with AI).
5. Post the tweet.
6. Repeat every 24 hours.

## Deployment

This bot is ready for deployment on platforms like Render or Heroku.

- **Render**: Create a Web Service. Set the Build Command to `npm install` and Start Command to `node bot.js`. Add your environment variables in the dashboard. The `RENDER_EXTERNAL_URL` variable triggers the self-ping mechanism.

## License

ISC
