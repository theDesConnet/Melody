module.exports = {
    name: "defaultautoplay",
    description: "Настройки автовоспроизведения по умолчанию",
    aliases: ["defaultap"],
    public: false,
    async execute(bot, message, args, config) {
        let data = await Servercfg.findOne({ guildID: message.guild.id });
        let text = args.join(" ");
        let result;

        if (data.defaultautoplay === "true") {result = "Включено"}
        if (data.defaultautoplay === "false") {result = "Выключено"}

        if(!text) return message.channel.send(`Сейчас автовоспроизведение по умолчанию: ${result}`)

        if(text === "on") {data.defaultautoplay = "true"; data.save(); message.channel.send("Вы включили автовоспроизведение по умолчанию")}
        else{if(text === "off") {data.defaultautoplay = "false"; data.save(); message.channel.send("Вы выключили автовоспроизведение по умолчанию")}
        else{errorembed("Неверные аргументы (Можно только: on/off)")}}
    }
};