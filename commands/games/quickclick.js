const { MessageEmbed } = require('discord.js');
require('@weky/inlinereply');
const { QuickClick } = require('weky');

module.exports = {
    name: "quickclick",
    description: "что-то новое",
    aliases: [],
    public: true,
    inVoiceChannel: false,
    async execute(client, message, args, config) { 
        await QuickClick({
            message: message,
            embed: {
                title: 'Quick Click',
                color: '#7289da',
                timestamp: true,
            },
            time: 60000,
            waitMessage: 'Теперь кнопки могут появиться в любое время!',
            startMessage:
                'Победит тот, кто первым нажмет правильную кнопку. У вас есть **{{time}}**!',
            winMessage: 'GG, <@{{winner}}> нажал кнопку за **{{time}} секунд**.',
            loseMessage: 'Никто вовремя не нажал кнопку. Игра окончена!',
            emoji: '👆',
            ongoingMessage:
                "Игра уже запущена в <#{{channel}}>. Ты не можешь начать новую!",
        });
    }
};