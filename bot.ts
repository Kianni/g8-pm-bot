const TelegramBot = require('node-telegram-bot-api');

const http = require('http');
const cheerio = require('cheerio');
const https = require('https');

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('ok');
});
server.listen(process.env.PORT || 5000);

import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const repo_token = process.env.PRIVATE_GITHUB_REPO_TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/start/, (msg, match) => {
  const chatId = msg.chat.id;
  const gif = path.join(__dirname, './assets/welcome.gif');
  const caption = `<b>Welcome!</b>🙋‍♀️
Your skills are appreciated and in high demand!\n\n
take a look on the Iron \/triangle or the PM \/topics...`;
  bot.sendDocument(chatId, gif, { caption: caption, parse_mode: 'HTML' });
});

bot.onText(/\/triangle/, (msg, match) => {
  const chatId = msg.chat.id;
  const photo = path.join(__dirname, './assets/pm_triangle.jpg');
  bot.sendPhoto(chatId, photo, { caption: 'go to the \/topics 👉' });
});

bot.onText(/\/aboutus/, (msg, match) => {
  const chatId = msg.chat.id;

  const options = {
    hostname: 'raw.githubusercontent.com',
    port: 443,
    path: '/eerikv/pmnotebook_group8/main/index.html',
    method: 'GET',
    headers: {
      'Authorization': `token ${repo_token}`
    }
  };

  const req = https.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      const $ = cheerio.load(data);
      let content = $('main.content-container.dark div.content div.content-header span').eq(1).text();
      content = content.trim().replace(/\s\s+/g, ' ');
      if (content) {
        bot.sendMessage(chatId, content);
      } else {
        console.log('Content is empty');
      }
    });
  });

  req.on('error', (err) => {
    console.log('Error: ' + err.message);
  });

  req.end();
});

bot.onText(/\/topics/, (msg) => {
  const chatId = msg.chat.id;

  const links = [
    '1️⃣ <a href="https://www.pmi.org/about/learn-about-pmi/what-is-project-management">Project Management</a>',
    '2️⃣ <a href="https://www.agilealliance.org/agile101/">Agile</a>',
    '3️⃣ <a href="https://www.scrum.org/">Scrum</a>',
    '4️⃣ <a href="https://www.lean.org/explore-lean/what-is-lean/">Lean</a>',
    '5️⃣ <a href="https://www.suomenvesiputoukset.fi/top-10-waterfalls-of-finland/">Waterfall</a>',
  ];

  const message = `Refresh your knowledge on\n` + links.join('\n');

  bot.sendMessage(chatId, message, { parse_mode: 'HTML', disable_web_page_preview: true });
});