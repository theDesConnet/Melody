const { MessageEmbed } = require('discord.js');
require('@weky/inlinereply');
const { FastType } = require('weky');

module.exports = {
    name: "fasttype",
    description: "что-то новое",
    aliases: [],
    public: true,
    inVoiceChannel: false,
    async execute(client, message, args, config) { 
        await FastType({
            message: message,
            embed: {
                title: 'FastType',
                description: 'У тебя есть **{{time}}** набрать следующее предложение.',
                color: '#7289da',
                timestamp: true
            },
            sentence: 'По пути во дворец гвардейцы весело арестовывали полусонных вельмож, живших на дворцовой набережной.',
            winMessage: 'GG, ваше количество слов в минуту **{{wpm}}** и вы сделали это за **{{time}}**.',
            loseMessage: 'Повезет в следующий раз!',
            cancelMessage: 'Вы закончили игру!',
            time: 60000,
            buttonText: 'Отмена',
            othersMessage: 'Только <@{{author}}> может использовать кнопки'
        });
    }
};