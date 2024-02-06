"use strict";
exports.__esModule = true;
var TelegramBot = require('node-telegram-bot-api');
var dotenv = require("dotenv");
dotenv.config();
var token = process.env.TELEGRAM_BOT_TOKEN;
// Create a bot that uses 'polling' to fetch new updates
var bot = new TelegramBot(token, { polling: true });
bot.onText(/\/start/, function (msg, match) {
    var chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Hello, World!');
});
