module.exports = {
    name: "filter",
    description: "Ставим фильтры",
    aliases: ["setfilter"],
    public: true,
    inVoiceChannel: true,
    async execute(client, message, args, config) {
        let queue = distube.getQueue(message);
        if (!queue) return embederror("Здесь ничего не играет :3");
        if (args[0] === "off" && queue.filter) distube.setFilter(message, queue.filter)
        else if (Object.keys(distube.filters).includes(args[0])) distube.setFilter(message, args[0])
        else if (args[0]) return message.channel.send(`${client.emotes.error} | Not a valid filter`)
        message.channel.send("Что-ж теперь музыка у нас будет с фильтром: " + (queue.filter || "Никаким"));
    }
}
