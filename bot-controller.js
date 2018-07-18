const TRIGGER = '!senpai ';
const KNOWN_COMMANDS = ['incroyable', 'notice-me', 'help-me', 'd-e-l-e-t-e-t-h-i-s'];

const PRINT_COMMANDS = () => {
	const cmds = KNOWN_COMMANDS.reduce((acc, cur) => {
		return acc + ` "${cur}" `;
	}, '[');

	return cmds + " ]";

}

module.exports = {
	handle(message) {
		const { content } = message;
		if (!content) return 'Not a message with content';

		const isBotMessage = content.startsWith(TRIGGER);
		if (!isBotMessage) return 'Not a message for senpai bot';
		
		const removedTrigger = content.replace(TRIGGER, '');

		const splitBySpace = removedTrigger.split(' ');

		const command = splitBySpace[0];
		console.log(splitBySpace);
		console.log(command);
		if (!command) {
			message.channel.send("Try typing !senpai help-me");
			return 'Not a valid command';
		}

		if (command === 'help-me') {
			message.channel.send(`Avaiable commands ${PRINT_COMMANDS()}`);
			return 'Help';
		}

		if (command === 'notice-me') {
			message.channel.send(`Mister ${message.author.username}`, {
			    file: "https://media.giphy.com/media/Nx0rz3jtxtEre/giphy.gif" // Or replace with FileOptions object
			});
			return 'Noticed';
		}

		if (command === 'd-e-l-e-t-e-t-h-i-s') {
			message.channel.send(`Let me think`, {
			    file: "https://media.giphy.com/media/l3vRkn7F5yV6wFBlu/giphy.gif" // Or replace with FileOptions object
			});
			return 'DeleteThis';
		}

		if (command === 'incroyable') {
			message.channel.send(`Mais c'est `, {
			    file: "https://thumbs.gfycat.com/MisguidedGlitteringItaliangreyhound-max-1mb.gif" // Or replace with FileOptions object
			});
			return 'Incoryable';
		}

		message.channel.send("Not a valid command");
		message.channel.send(`Avaiable commands ${PRINT_COMMANDS()}`);
		return 'Not a valid command';	
	},
};
