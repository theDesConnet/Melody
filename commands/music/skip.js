module.exports = {
    name: "skip",
    description: "Скипаем музыку)",
    aliases: [],
    public: true,
    inVoiceChannel: true,
    async execute(client, message, args, config) {  
        message.channel.send("Пытаюсь пропустить...").then(msg => {
            distube.skip(message);
            msg.edit("Пропустила! :3");
            msg.delete({timeout: 5000});
        });
    }
};