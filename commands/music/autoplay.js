const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "autoplay",
    description: "Автовоспроизведение)",
    aliases: [],
    public: true,
    inVoiceChannel: true,
    async execute(client, message, args, config) {
        let mode = distube.toggleAutoplay(message);
        let embed = new MessageEmbed().setDescription("Автовоспроизведение установлено на: `" + (mode ? "On" : "Off") + "`").setColor(0xC30AC9)
        message.channel.send(embed);
    }
};