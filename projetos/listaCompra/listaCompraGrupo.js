const env = require('../../.env');
const Telegraf = require('telegraf');
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');
const bot = new Telegraf(env.token);

let dados = {};

const gerarBotoes = lista => Extra.markup(
    Markup.inlineKeyboard(
        lista.map(item => Markup.callbackButton(item, `delete ${item}`))
            ,{columns: 3}
    )
)

bot.start(async ctx => {
    const name = ctx.update.message.from.first_name;
    await ctx.reply(`Seja bem vindo, ${name} !`);
    await ctx.reply('Escreva os itens que você seja adicionar ....');
})

bot.use((ctx, next) =>{
    const chatId = ctx.update.message.chat.id;
    if(!dados.hasOwnProperty(chatId)) dados[chatId] = [];
    ctx.itens = dados[chatId];
    next();
})

bot.on('text', ctx => {
    const texto = ctx.update.message.text;
    if(texto.startsWith('/')) texto = texto.substring(1);
    ctx.iten.push(texto);
    ctx.reply(`${texto} adicionado com sucesso !`, gerarBotoes(ctx.itens));
});

bot.action(/delete (.+)/, ctx => {
    const indice = ctx.itens.indexOf(ctx.match[1]);
    if(indice >= 0) ctx.itens.splice(indice, 1);
    ctx.reply(`${ctx.match[1]} deletado com sucesso !`, gerarBotoes(ctx.itens))
})

bot.startPolling();