const { MessageEmbed } = require('discord.js');
require('@weky/inlinereply');
const { Snake } = require('weky');

module.exports = {
    name: "snake",
    description: "что-то новое",
    aliases: [],
    public: true,
    inVoiceChannel: false,
    async execute(client, message, args, config) { 
        await Snake({
            message: message,
            embed: {
                title: 'Змейка',
                description: 'ГГ, ты набрал **{{score}}** очков!',
                color: '#7289da',
                timestamp: true,
            },
            emojis: {
                empty: '⬛',
                snakeBody: '🟩',
                food: '🍎',
                up: '⬆️',
                right: '⬅️',
                down: '⬇️',
                left: '➡️',
            },
            othersMessage: 'Только <@{{author}}> может использовать кнопки',
            buttonText: 'Cancel',
        });
    }
};