const env = require('../.env')
const Telegraf = require('telegraf')
const bot = new Telegraf(env.token)

bot.start((ctx, next) => {
    const from = ctx.update.message.from;
    console.log(from);
    ctx.reply(`Seja bem vindo, ${from.first_name}`);
    next();
})

bot.start(ctx => {
    ctx.reply(`Me chamo Jasmin e vou te ajudar a controlar seus gastos !`)
})


bot.on('text',async (ctx, next)=>{
    await ctx.reply('Mid1');
    next();    
})

bot.on('text', async ctx =>{
    await ctx.reply('Mid2');
})
bot.startPolling(); //inicia o bot
