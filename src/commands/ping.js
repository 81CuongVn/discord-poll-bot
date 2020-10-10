module.exports = {
    name: 'ping',
    execute(message) {
        return message.channel.send('Pong!');
    },
};