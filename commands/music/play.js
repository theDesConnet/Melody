module.exports = {
    name: "play",
    description: "Проигрываем музыку)",
    aliases: [],
    public: true,
    inVoiceChannel: true,
    async execute(client, message, args, config) {
        const string = args.join(" ")
        if (!string) return errorembed('Пожалуйста вставьте ссылку или введите запрос!')
        try {
            distube.play(message, string)
        } catch (e) {
            errorembed(e);
        }
    }
};