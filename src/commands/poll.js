const emojiArray = require('../util/optionArray');
const squigglyRegex = RegExp(/{(.*)}/);
const squareRegex = RegExp(/\[[^[]+\]/g);

module.exports = {
    name: 'poll',
    async execute(message, args) {
        const pollTitle = squigglyRegex.test(args[0]) ? squigglyRegex.exec(args[0])[1] : null;

        if (!pollTitle) {
            return message.channel.send('You need to specify a poll title');
        }

        const pollsArray = args.slice(1).join(' ').match(squareRegex);

        if (!pollsArray) {
            return message.channel.send('You need to specify poll options');
        }
        else if (pollsArray.length > 20) {
            return message.channel.send('You can\'t have more than 20 poll options.');
        }

        let i = 0;
        const pollString = pollsArray.map(poll => `${emojiArray()[i++]} ${poll.replace(/\[|\]/g, '')}`).join('\n\n');

        const embed = {
            color: 'BLUE',
            title: pollTitle,
            description: pollString,
        };

        const msg = await message.channel.send({ embed: embed });


        for (i = 0; i < pollsArray.length; i++) {
            await msg.react(emojiArray()[i]).catch(err => console.log(err));
        }
    },
};