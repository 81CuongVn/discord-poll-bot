const { prefix } = require('../../config.json');

module.exports = {
    name: 'help',
    execute(message) {
        const embed = {
            color: 'BLUE',
            thumbnail: {
                url: message.client.user.displayAvatarURL({ format: 'png' }),
            },
            description: `
                **Polls**
                Create a poll using the command
                \`${prefix}poll {Title} [Option 1] [Option 2] [Option 3]\`

                You can create a poll with a expiry date and end the poll once over
                \`${prefix}poll {Title} {Time} [Option 1] [Option 2] [Option 3]\`

                **Note:** Each poll can have up to 20 options.

                **Other Commands**
                ${message.client.commands.filter(c => c.name != 'poll').map(c => `\`${c.name}\``).join(' ')}
            `,
        };

        message.channel.send({ embed: embed })
            .catch(err => console.log(err));
    },
};