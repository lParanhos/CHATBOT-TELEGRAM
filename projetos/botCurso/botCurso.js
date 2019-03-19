const env = require('../../.env');
const Telegraf = require('telegraf');
const bot = new Telegraf(env.token);
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');
const axios = require('axios');

const tecladoOpcoes = Markup.keyboard([
    ['O que são bots?', 'O que verei no curso?'],
    ['Posso mesmo automatizar tarefas?'],
    ['Como comprar o curso?']
]).resize().extra();

const botoes = Extra.markup(Markup.inlineKeyboard([
    Markup.callbackButton('Sim', 's'),
    Markup.callbackButton('Não', 'n')
], { columns: 3 }))

const localizacao = Markup.keyboard([
    Markup.locationRequestButton('Clique aqui para enviar sua localização')
]).resize().oneTime().extra();

bot.start(async ctx => {
    const name = ctx.update.message.from.first_name;
    await ctx.replyWithMarkdown(`*Seja bem vindo, ${name} !* \n Eu sou o chatBot do curso`);
    await ctx.replyWithPhoto('http://files.cod3r.com.br/curso-bot/bot.png');
    await ctx.replyWithMarkdown(`_Posso te ajudar em algo?_`, tecladoOpcoes);
})

bot.hears('O que são bots?', ctx => {
    ctx.replyWithMarkdown('Bots são bla, bla, bla.... \n _Algo mais ?_', tecladoOpcoes)
})

bot.hears('O que verei no curso?', async ctx => {
    await ctx.replyWithMarkdown('No *curso* ... tb vamos criar *3 projetos*: ');
    await ctx.reply('1. Um Bot que vai gerenciar sua lista de compras');
    await ctx.reply('2. Um bot que vai permitir cadastrar seus eventos');
    await ctx.reply('3. E você verá como fui feito, isso mesmo, você fará uma cópia de mim...');
    await ctx.replyWithMarkdown('\n\n_Algo mais ?_', tecladoOpcoes);
})
bot.hears('Posso mesmo automatizar tarefas?', ctx => {
    ctx.reply('Claro que sim o bot servirá...\n Quer uma palhinha?', botoes)
})
bot.hears('Como comprar o curso?', async ctx => {
    await ctx.replyWithMarkdown('É fácil... [link](www.google.com.br)', tecladoOpcoes)
})

bot.action('n', ctx => {
    ctx.reply('OK, tudo bem :(', tecladoOpcoes);
})

bot.action('s', async ctx => {
    await ctx.reply(`Que legal, tente me enviar sua localização, ou escreva uma mensagem qualquer....`, localizacao);
})

bot.hears(/mensagem qualquer/i, async ctx => {
    await ctx.reply('Essa piada é velha conte outra...', tecladoOpcoes);
})

bot.on('text', async ctx => {
    let msg = ctx.message.text;
    // pega a mensagem faz um split transformando em array depois inverte os dados desse array e os junta novamente ao contrário
    msg = msg.split('').reverse().join('');
    await ctx.reply(`A sua mensagem ao contrário é : ${msg}`);
    await ctx.reply('Isso mmostra que eu consigo ler o que você escreve e processar sua mensagem', tecladoOpcoes)
});

bot.on('location', async ctx => {
    try {
        const url = 'http://api.openweathermap.org/data/2.5/weather';
        const { latitude: lat, longitude: lon } = ctx.message.location;
        console.log(lat, lon);
        const res = await axios.get(`${url}?lat=${lat}$lon=${lon}&APPID=0d96c3a612d5c69a2f7c00b9dc7a5efe&unitis=metric`);
        await ctx.reply(`Hum você está em ${res.data.name}`);
        await ctx.reply(`A temperatura aí está em ${res.data.main.temp}°C`, tecladoOpcoes);

    }
    catch(e){
        ctx.reply('Estou com alguns problemas com sua localização');

    }
})
bot.startPolling();