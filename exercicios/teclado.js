const env = require('../.env');
const Telegraf = require('telegraf');
const Markup = require('telegraf/markup');
const bot = new Telegraf(env.token);

const tecladoCarnes = Markup.keyboard([
    ['🍗 Coxa de Frango', '🥓 Toucinho'],
    ['🐮 Carne de Boi', '🐟 Peixe'],
    ['🐫 Camelo', '🐃 Búfalo'],
    ['🐓 Galinha', '🤐 Sou vegetariano']
]).resize().extra();

bot.start(async ctx=> {
    await ctx.reply(`Seja bem vindo, ${ctx.update.message.from.first_name}`);
    await ctx.reply(`Qual Bebida você prefere?`,
        Markup.keyboard(['Coca', 'Pepsi']).resize().oneTime().extra());
});

bot.hears(['Coca', 'Pepsi'], async ctx => {
    await ctx.reply(`Nossa! Eu também gosto de ${ctx.match}`);
    await ctx.reply('Qual a sua carne predileta?', tecladoCarnes);

});

bot.hears('🐮 Carne de Boi', ctx => ctx.reply('É a minha predileta também'));
bot.hears('🤐 Sou vegetariano', 
        ctx => ctx.reply('KKKKKKKK Não sabe o que está perdendo 😅'));

bot.on('text', ctx => ctx.reply('Legal !'));

bot.startPolling();
