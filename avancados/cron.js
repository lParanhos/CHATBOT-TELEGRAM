const env = require('../.env');
const schedule = require('node-schedule');
const Markup = require('telegraf/markup');
const Extra = require('telegraf/extra');
const Telegraf = require('telegraf');
const Telegram = require('telegraf/telegram');
const telegram = new Telegram(env.token);
const bot = new Telegraf(env.token);

let contador =1 

const botoes = Extra.markup(Markup.inlineKeyboard([
    Markup.callbackButton('Cancelar', 'cancel')
]))

const notificar = () => {
    telegram.sendMessage(env.userID, `Essa é uma nova mensagem de evento [${contador++}]`, botoes)
}

const notificacao = new schedule.scheduleJob('*/5 *****', notificar);

bot.action('cancel', ctx => {
    notificacao.cancel()
    ctx.reply('Ok! Parei ...')
})

bot.startPolling();