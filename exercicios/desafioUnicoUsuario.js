// Ao seu dispor mestre
// Sinto muito mas só falo com meu mestre
const env = require('../.env');
const Telegraf = require('telegraf');
const bot = new Telegraf(env.token);

bot.start(ctx => {
    const from = ctx.update.message.from;
    console.log(from)
    if (from.id === 715572015) {
        ctx.reply('Ao seu dispor, mestre !');
    }
    else
        ctx.reply('Sinto muito, mas só falo com meu mestre');
});

bot.startPolling();