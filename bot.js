"use strict";
exports.__esModule = true;
var TelegramBot = require('node-telegram-bot-api');
var dotenv = require("dotenv");
var path = require("path");
dotenv.config();
var token = process.env.TELEGRAM_BOT_TOKEN;
// Create a bot that uses 'polling' to fetch new updates
var bot = new TelegramBot(token, { polling: true });
bot.onText(/\/start/, function (msg, match) {
    var chatId = msg.chat.id;
    var gif = path.join(__dirname, './assets/welcome.gif');
    var caption = "<b>Welcome!</b>\uD83D\uDE4B\u200D\u2640\uFE0F\nYour skills are appreciated and in high demand!\n\n\ntake a look on the Iron /triangle or the PM /topics...";
    bot.sendDocument(chatId, gif, { caption: caption, parse_mode: 'HTML' });
});
bot.onText(/\/triangle/, function (msg, match) {
    var chatId = msg.chat.id;
    var photo = path.join(__dirname, './assets/pm_triangle.jpg');
    bot.sendPhoto(chatId, photo, { caption: 'go to the \/topics 👉' });
});
bot.onText(/\/topics/, function (msg) {
    var chatId = msg.chat.id;
    var links = [
        '1️⃣ <a href="https://www.pmi.org/about/learn-about-pmi/what-is-project-management">Project Management</a>',
        '2️⃣ <a href="https://www.agilealliance.org/agile101/">Agile</a>',
        '3️⃣ <a href="https://www.scrum.org/">Scrum</a>',
        '4️⃣ <a href="https://www.lean.org/explore-lean/what-is-lean/">Lean</a>',
        '5️⃣ <a href="https://www.suomenvesiputoukset.fi/top-10-waterfalls-of-finland/">Waterfall</a>',
    ];
    var message = "Refresh your knowledge on\n" + links.join('\n');
    bot.sendMessage(chatId, message, { parse_mode: 'HTML', disable_web_page_preview: true });
});
