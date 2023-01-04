const { MessageEmbed } = require('discord.js');
require('@weky/inlinereply');
const { RockPaperScissors } = require('weky');

module.exports = {
    name: "rockpaperscissors",
    description: "что-то новое",
    aliases: [],
    public: true,
    inVoiceChannel: false,
    async execute(client, message, args, config) { 
        await RockPaperScissors({
            message: message,
            opponent: message.mentions.users.first(),
            embed: {
                title: 'Камень, Ножницы, Бумага',
                description: 'Нажмите кнопку ниже, чтобы выбрать свой элемент.',
                color: '#7289da',
                timestamp: true,
            },
            buttons: {
                rock: 'Камень',
                paper: 'Бумага',
                scissors: 'Ножницы',
                accept: 'Принять',
                deny: 'Отклонить',
            },
            time: 60000,
            acceptMessage:
                '<@{{challenger}}> вызвал на поединок <@{{opponent}}> в игру Камень, Ножницы, Бумага',
            winMessage: 'Лол, <@{{winner}}> выйграл!',
            drawMessage: 'Упс, похоже что у нас ничья',
            endMessage: "<@{{opponent}}> не ответил вовремя, поэтому игра отменена",
            timeEndMessage:
                "Вы оба что-то не выбрали вовремя. Игра была отменена",
            cancelMessage:
                '<@{{opponent}}> отказался от вашего предложения',
            choseMessage: 'Вы выбрали {{emoji}}',
            noChangeMessage: 'Вы не можете поменять свой выбор!',
            othersMessage: 'Только {{author}} может использовать кнопки!',
            returnWinner: false,
        });
    }
};