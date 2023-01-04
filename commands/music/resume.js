module.exports = {
    name: "resume",
    description: "Проигрываем музыку)",
    aliases: [],
    public: true,
    inVoiceChannel: true,
    async execute(client, message, args, config) {
        let queue = distube.getQueue(message);
        if (!queue) return embederror("Здесь ничего не играет :3");
        distube.resume(message);
    }
};