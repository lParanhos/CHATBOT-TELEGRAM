const env = require('../.env');
const Markup = require('telegraf/markup');
const axios = require('axios');
const Telegram = require('telegraf/telegram');

const enviarMensagem = msg => {
    axios.get(`${env.apiUrl}/sendMessage?chat_id=${env.userID}&text=${encodeURI(msg)}`)
    .catch(e => console.log(e))
}

// envia apenas umas vez
enviarMensagem('Enviando mensagens de forma assincrona')


// envia de acordo com o intervalo definido
/* setInterval(() => {
    enviarMensagem('Enviando mensagens de forma assincrona')

}, 3000) */

const teclado = Markup.keyboard([
    ['Ok', 'Cancelar']
]).resize().oneTime().extra();

const telegram = new Telegram(env.token);
telegram.sendMessage(env.userID, 'Essa é uma mensagem com teclado', teclado)