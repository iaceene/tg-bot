import { Bot } from 'grammy';

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

let initialized = false;

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(200).send('ok');
  }

  try {
    if (!initialized) {
      await bot.init();
      initialized = true;
    }
    await bot.handleUpdate(req.body);
  } catch (err) {
    console.error('Update failed:', err);
  }

  // Always answer 200 so Telegram does not keep retrying
  return res.status(200).json({ ok: true });
}