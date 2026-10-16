import express from 'express';
import { Bot, webhookCallback } from 'grammy';
import dotenv from 'dotenv';
import path from 'path'

let status = "starting...."

dotenv.config({ debug: false });

const {BOT_TOKEN, PUBLIC_URL, PORT = 3000 } = process.env

if (!BOT_TOKEN || !PUBLIC_URL){
    throw "Missing BOT_TOKEN or PUBLIC_URL in environment variables."
}


const bot = new Bot(BOT_TOKEN);
const app = express();

bot.command('start', (ctx) => ctx.reply('Welcome! This bot handles updates via Webhooks.'));
bot.command('ping', (ctx) => ctx.reply('Pong! 🏓'));

bot.on('message:text', (ctx) => {
  const text = ctx.message.text;
  ctx.reply(`You said: ${text}`);
});

app.use(express.json());
app.use(`/${BOT_TOKEN}`, webhookCallback(bot, 'express'));

app.get('/', (req, res)=>{
    res.json({status})
})

app.listen(PORT, async ()=>{
    console.log(`server is runing on port ${PORT}`);
    try {
        const webhookUrl = `${PUBLIC_URL}/${BOT_TOKEN}`;
        await bot.api.setWebhook(webhookUrl);
        status = `Webhook successfully set to: ${webhookUrl}`;
    } catch (error) {
        status = `Failed to set Telegram Webhook: ${(error as Error).message}`
    }
})
