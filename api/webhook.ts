
import { Bot, webhookCallback } from 'grammy';

const token = process.env.BOT_TOKEN;

if (!token) {
  throw new Error('Missing BOT_TOKEN environment variable');
}

const bot = new Bot(token);

bot.command('start', async (ctx) => {
  await ctx.reply('Welcome! This bot handles updates via webhooks.');
});

bot.command('ping', async (ctx) => {
  await ctx.reply('Pong! 🏓');
});

bot.on('message:text', async (ctx) => {
  await ctx.reply(`You said: ${ctx.message.text}`);
});

export default webhookCallback(bot, 'express');
