require('dotenv').config();
const { Client } = require('discord.js');
const client = new Client();

client.on('ready', () => {
    console.log('Yo this is ready!');
});

client.login(process.env.token);