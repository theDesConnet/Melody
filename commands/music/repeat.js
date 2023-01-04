const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "repeat",
    description: "Повтор",
    aliases: [],
    public: true,
    inVoiceChannel: true,
    async execute(client, message, args, config) {
        const queue = distube.getQueue(message)
        if (!queue) return errorembed(`Ничего не играет!`)
        let mode = null
        switch (args[0]) {
            case "off":
                mode = 0
                break
            case "song":
                mode = 1
                break
            case "queue":
                mode = 2
                break
        }
        mode = distube.setRepeatMode(message, mode);
        mode = mode ? mode == 2 ? "Плейлист" : "Одна песня" : "Выключен";
        let embed = new MessageEmbed().setDescription("Повтор: `" +mode+ "`").setColor(0xC30AC9)
        message.channel.send(embed);
    }
};