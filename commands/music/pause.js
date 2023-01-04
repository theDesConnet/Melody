module.exports = {
    name: "pause",
    description: "Пауза",
    aliases: [],
    public: true,
    inVoiceChannel: true,
    async execute(client, message, args, config) {
        let queue = distube.getQueue(message);
        if (!queue) return embederror("Здесь ничего не играет :3");  
        distube.pause(message);
        message.channel.send("**Готово!**");
    }
};