module.exports = {
    name: "join",
    description: "Заходит в голосовой",
    aliases: [],
    public: true,
    inVoiceChannel: true,
    async execute(client, message, args, config) {
        message.member.voice.channel.join();
    }
};