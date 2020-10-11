require('dotenv').config();
const { Client, Collection } = require('discord.js');
const { readdirSync } = require('fs');
const { connect } = require('mongoose');
const fetchAll = require('./util/fetchAll');
const emojiArray = require('./util/optionArray');
const pollModel = require('./models/poll');
const client = new Client();
const prefix = process.env.prefix;

client.commands = new Collection();

const commandFiles = readdirSync('./src/commands');
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Yo this is ready!');

    connect(process.env.dburl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(console.log('MongoDB Connected'));

    setInterval(async () => {
        for (const guild of client.guilds.cache) {
            const pollArray = await pollModel.find({
                guild: guild[0],
            });

            for (const poll of pollArray) {
                if (Date.now() >= Number(poll.expiryDate)) {
                    const channel = client.channels.cache.get(poll.textChannel);
                    const msg = await channel.messages.fetch(poll.message);

                    const resultsArr = [];

                    for (const e of emojiArray()) {
                        const allReactions = await fetchAll(msg, e);
                        resultsArr.push([e, typeof allReactions == 'object' ? allReactions.length : undefined]);
                    }

                    resultsArr.sort((a, b) => b[1] - a[1]);

                    console.log(resultsArr);

                    if (resultsArr[0][1] == resultsArr[1][1]) {
                        channel.send(`It was a tie! \nhttps://discordapp.com/channels/${msg.guild.id}/${channel.id}/${msg.id}`);
                    }
                    else {
                        channel.send(`The winner of the poll was option ${resultsArr[0][0]} \nhttps://discordapp.com/channels/${msg.guild.id}/${channel.id}/${msg.id}`);
                    }

                    await poll.deleteOne();
                }
            }
        }
    }, 2000);
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command);

    if (!cmd) return;

    try {
        cmd.execute(message, args);
    }
    catch (error) {
        console.error(error);
        message.channel.send('There was an error trying to execute that command!');
    }
});

client.login(process.env.token);