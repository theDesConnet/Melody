const discord = require("discord.js");

module.exports = {
    name: "queue",
    description: "Очередь",
    aliases: [],
    public: true,
    inVoiceChannel: true,
    async execute(client, message, args, config) {
        let queue = distube.getQueue(message);
        if (!queue) return embederror("Здесь ничего не играет :3");
        let musembed = new discord.MessageEmbed()
            .setTitle("Текущий плейлист:")
            .setDescription(queue.songs.map((song, id) => `**${id + 1}**. \`${song.name}'\` - \`${song.formattedDuration}\``).join("\n"))
        message.channel.send(musembed);
    }
};