const { MessageEmbed } = require('discord.js');
require('@weky/inlinereply');
const { Calculator } = require('weky');

module.exports = {
    name: "calc",
    description: "что-то новое",
    aliases: [],
    public: true,
    inVoiceChannel: false,
    async execute(client, message, args, config) { 
        await Calculator({
            message: message,
            embed: {
                title: 'Калькулятор',
                color: '#7289da',
                timestamp: true
            },
            disabledQuery: 'Калькулятор отключен!',
            invalidQuery: 'Указанное уравнение недействительно!',
            othersMessage: 'Только <@{{author}}> может использовать кнопки'
        });
    }
};