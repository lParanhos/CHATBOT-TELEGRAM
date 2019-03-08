const env = require('../.env');
const Telegraf = require('telegraf');
const bot = new Telegraf(env.token);

bot.start(ctx => {
    const nome = ctx.update.message.from.first_name;
    ctx.reply(`Seja bem vindo, ${nome} !\nMe avise se precisar de /ajuda`);
});

bot.command('ajuda', ctx => ctx.reply('/ajuda: vou mostrar as opções'
    + '\n/Quem é você ?'
    + '\n/ajuda2: para testar via hears'
    + '\n/op2: Opção genérica'
    + '\n/op3: Outra opção genérica qualquer'));

bot.hears('/ajuda2', ctx => ctx.reply('Eu também consigo capturar comandos'
    + ', mas utilize a /ajuda mesmo !'));
bot.hears(/\/op(2|3)/i, ctx => ctx.reply('Resposta padrão para comando genéricos !'));

bot.hears('/Quem', ctx => ctx.replyWithMarkdown('Me desculpe a falta de educação, deixe eu me apresentar...'
                + '\nMe chamo *Jasmin*, sou um ChatBot em *desenvolvimento*, e logo estarei ajudando você no seu dia a dia !'))


bot.startPolling();
