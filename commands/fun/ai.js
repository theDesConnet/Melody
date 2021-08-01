module.exports = {
    name: "ai",
    description: "Слабенький и глупенький ИИ",
    aliases: ["h"],
    public: true,
    async execute(bot, message, args, config) {
        let alexa = require('alexa-bot-api');
        let ai = new alexa("aw2plm")
        let text = args.join(" ");

        if(!text) return infoembed("Слабенький и глупенький ИИ (Бета-тест)\nP.s может отвечать медлено и иногда не по теме", `ai (Текст)`)

        ai.getReply(text).then(reply => message.channel.send(reply));
    }
};
