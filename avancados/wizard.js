const env = require('../.env');
const Telegraf = require('telegraf');
const Composer = require('telegraf/composer');
const session = require('telegraf/session');
const Stage = require('telegraf/stage');
const Scene = require('telegraf/scenes/base');
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');
const WizardScene = require('telegraf/scenes/wizard');

let descricao = '';
let preco = 0;
let data = null;

const confirmacao = Extra.markup(Markup.inlineKeyboard([
    Markup.callbackButton('Sim', 's'),
    Markup.callbackButton('Não', 's')
]))

const precoHandler = new Composer();
precoHandler.hears(/(\d+)/, ctx => {
    preco = ctx.match[1];
    ctx.reply('É para pagar que dia ?');
    ctx.wizard.next();
})

precoHandler.use(ctx => ctx.reply('Apenas números são aceitos ....'));

const dataHandler = new Composer();
dataHandler.hears(/(\d{2}\/\d{2}\/\d{4})/, ctx => {
    data = ctx.match[1];
    ctx.reply(`Aqui está um resumo da sua compra: 
    Descrição: ${descricao}
    Preço: ${preco}
    Data: ${data}
    Confirma ?`, confirmacao);
    ctx.wizard.next();
});

dataHandler.use(ctx => ctx.reply('Entre com uma data DD/MM/AAAA'));

const confirmacaoHandler = new Composer();
confirmacaoHandler.action('s', ctx => {
    ctx.reply('Compra concluida !');
    ctx.scene.leave();
});

confirmacaoHandler.action('n', ctx => {
    ctx.reply('Compra cancelada !');
    ctx.scene.leave()
})

confirmacaoHandler.use(ctx => ctx.reply('Por favor apenas confirme !!!!', confirmacao));


const wizardCompra = new WizardScene('compra',

    ctx => {
        ctx.reply('O que você comprou ?');
        ctx.wizard.next()
    },

    ctx => {
            descricao = ctx.update.message.text;
            ctx.reply('Quanto foi ?');
            ctx.wizard.next()
    },
// outros middlewares criados
    precoHandler,
    dataHandler,
    confirmacaoHandler
)

const bot = new Telegraf(env.token);
const stage = new Stage([wizardCompra], {default: 'compra'});
bot.use(session());
bot.use(stage.middleware());
bot.startPolling()