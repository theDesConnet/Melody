module.exports = {
    name: "aialexa",
    description: "да, да ai вернулся",
    aliases: [],
    public: false,
    inVoiceChannel: false,
    async execute(client, message, args, config) {
        let alexa = require('alexa-bot-api')
        let ai = new alexa()

        let text = args.join(" ");
        if (!text) return message.channel.send("Нет, ну так не интересно бяка s( ^ ‸ ^)-p \n Напиши мне что нибудь s( ^ ‿ ^)-b")
    
        ai.getReply(text, "russian").then((reply) => {
            message.channel.send(reply);
        })
    }
};