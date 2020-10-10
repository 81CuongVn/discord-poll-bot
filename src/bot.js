require('dotenv').config();
const { Client, Collection } = require('discord.js');
const { readdirSync } = require('fs');
const client = new Client();
const prefix = process.env.prefix;

client.commands = new Collection();

const commandFiles = readdirSync('./src/commands');
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log('Yo this is ready!');
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