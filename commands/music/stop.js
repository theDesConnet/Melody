module.exports = {
    name: "stop",
    description: "Останавливает музыку)",
    aliases: [],
    public: true,
    inVoiceChannel: true,
    async execute(client, message, args, config) {
        distube.stop(message);
        message.channel.send("Остановлено :3");
    }
};