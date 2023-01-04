global.Discord = require('discord.js');
const client = new Discord.Client();
const DisTube = require('distube');
global.distube = new DisTube(client, { searchSongs: 15, emitNewSongOnly: false });
global.songinfo = distube.Song;
global.mongoose = require('mongoose');
global.Servercfg = require("./db/serverconfig.js");
const Buttons = require('discord-buttons')(client);
const config = require('./jsons/config.json');
const fs = require('fs');
const botinfo = require("./jsons/botinfo.json");
const { MessageEmbed } = require('discord.js');
client.commands = new Discord.Collection();

mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected', () => {
    console.log('[✅ DataBase] Connected!')
})

fs.readdirSync('./commands').forEach(module => {
    const commandFiles = fs.readdirSync(`./commands/${module}/`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${module}/${file}`);
        command.category = module;
        client.commands.set(command.name, command);
    }
})

client.on('ready', () => {
    console.log("Мэлоди загрузилась");
    console.log("By DesConnet");
    console.log(`Version: ${botinfo.version}`);
    client.user.setPresence({ activity: { name: `больную фантазию автора | ${config.prefix}help`, type: 'LISTENING' }, status: 'online' })
        .then(console.log)
        .catch(console.error);

});

client.on('clickButton', async (button) => {
    if (button.id === "skipsong") {
        button.message.edit("Пробую пропустить");
        distube.skip(button.message)
        button.message.edit("Пропустила! :3")
    }
    if (button.id === "playpausesong") {
        if (distube.isPlaying(button.message) = true) {
            distube.pause(button.message)
            button.message.edit("Трек на паузе");
        }
        else {
            if (distube.isPaused(button.message) = true) {
                distube.resume(button.message)
                button.message.edit("Воспроизведеие...");
            }
        }
    }
    if (button.id === "infosong") {

    }
    if (button.id === "stop") {
        distube.stop(button.message)
        button.message.edit("Остановленно)");
        button.message.delete({ timeout: 5000 });
    }
});

client.on('guildCreate', async (guild) => {
    let embed = new MessageEmbed().setTitle("Спасибо что пригласил(а) меня в это чудесное место").setDescription("Привет! Меня зовут Мэлоди, и надеюсь я буду вам полезна.\nЕще раз спасибо что дали мне шанс быть полезной для вас\n\n[Пригласить меня на другой сервер](https://discord.com/api/oauth2/authorize?client_id=852439979967774722&permissions=2683662199&scope=bot)").setThumbnail(client.user.avatarURL(true)).setFooter(`${guild.name} | Мэлоди (Nightly)`, client.user.avatarURL('jpg'));

    let serverconfig = await Servercfg.findOne({ guildID: guild.id });
    if (!serverconfig) { Servercfg.create({ guildID: guild.id }); }

    const channel = guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'));
    channel.send(embed);
});

client.on('message', async (message) => {
    if (message.author.bot) return;
    if (message.channel.type == 'dm') return;

    let serverconfig = await Servercfg.findOne({ guildID: message.guild.id });
    if (!serverconfig) { Servercfg.create({ guildID: message.guild.id }); }
    if (!message.content.startsWith(serverconfig.prefix)) return;

    const args = message.content.slice(serverconfig.prefix.length).trim().split(/ +/g);
    const cmdName = args.shift().toLowerCase();
    const command = client.commands.get(cmdName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName));

    global.errorembed = function errorembed(text) {
        let errembed = new Discord.MessageEmbed()
            .setColor('RED')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .addField("Команда:", config.prefix + cmdName, false)
            .addField("Причина:", text, false)
            .setFooter(`${message.guild.name} | Мэлоди (Nightly)`, client.user.avatarURL('jpg'))
        message.channel.send("Упс... Похоже мы столкнулись с проблемой...", errembed)
    }

    if (command.inVoiceChannel && !message.member.voice.channel) return errorembed('Ты должен быть в голосовом канале!')
    if (!require('./jsons/config.json').owner.includes(message.author.id) && command.public === false) return;
    command.execute(client, message, args, config).catch((err) => {
        errorembed(err);
    });
});

distube.on("searchResult", (message, result) => {
    let i = 0;
    let embed = new MessageEmbed().setDescription(`**Выбери что хочешь послушать :3**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}`).setFooter("Или подожди 60 секунд чтобы отменить!")
    message.channel.send(embed).then(msg => {
        msg.delete({ timeout: 60000 });
    });
});

distube.on("addSong", (message, queue, song) => {
    let embed = new MessageEmbed().setDescription(`Добавлен трек: \`${song.name}\` - \`${song.formattedDuration}\` В очередь\nПредложил: ${song.user}`).setFooter(`${message.guild.name} | Мэлоди (Nightly)`);
    message.channel.send(embed).then(msg => {
        msg.delete({timeout: 25000})
    })
})

distube.on("searchCancel", (message) => message.channel.send(`**Поиск отменен :3**`));

distube.on("addList", (message, queue, playlist) => message.channel.send(
    `Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`
));

const status = (queue) => `Громкость: ${queue.volume}% | Повтор: ${queue.repeatMode ? queue.repeatMode == 2 ? "Плейлист" : "Одна песня" : "Выключен"} | Автовоспроизведение: ${queue.autoplay ? "On" : "Off"}`;
distube.on("playSong", (message, queue, song) => {
    let embed = new MessageEmbed().setColor(0xC30AC9).setDescription(`Сейчас играет: \`${song.name}\` - \`${song.formattedDuration}\`\nПредложил(а): ${song.user}`).setFooter(status(queue))
    message.channel.send(embed).then(msg => {
        msg.delete({ timeout: 20000 })
    });
});

distube.on("addList", (message, queue, playlist) => {
    let embed = new MessageEmbed().setColor(0xC30AC9).setDescription(`Добавлен \`${playlist.name}\` плейлист (${playlist.songs.length} песен) в очередь`).setFooter(status(queue))
    message.channel.send(embed).then(msg => {
        msg.delete({ timeout: 20000 })
    });
});

distube.on("initQueue", queue => {
    queue.autoplay = false;
    queue.volume = 50;
});

client.login(config.token);