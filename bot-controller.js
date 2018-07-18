const axios = require('axios');

const giphyAxios = axios.create({
	baseURL: 'https://api.giphy.com',
  	timeout: 5000,
})

const configs = require('./configs');

const TRIGGER = '!senpai ';
const KNOWN_COMMANDS = ['incroyable', 'notice-me', 'help-me', 'd-e-l-e-t-e-t-h-i-s'];

const PRINT_COMMANDS = () => {
	const cmds = KNOWN_COMMANDS.reduce((acc, cur) => {
		return acc + ` "${cur}" `;
	}, '[');

	return cmds + " ]";

}

module.exports = {
	handle: (message) => {
		const { content } = message;
		console.log('Handling ' + message.content);

		if (!content) return 'Not a message with content';

		const isBotMessage = content.startsWith(TRIGGER);
		if (!isBotMessage) return 'Not a message for senpai bot';
		if (message.author.bot) return 'Message from bot';

		const removedTrigger = content.replace(TRIGGER, '');

		const splitBySpace = removedTrigger.split(' ');

		const command = splitBySpace[0];

		if (command === 'help-me') {
			message.channel.send(`Avaiable commands ${PRINT_COMMANDS()}`);
			message.channel.send(`If no command matches, it will, for the time being, try to fetch a related gif`);
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
		try {
			const params = {
				q: removedTrigger, api_key: configs.giphyKey, limit: 1
			};
			return  giphyAxios.get('/v1/gifs/search', { params })
			.then((response) => {
				const gifs = response.data.data || [];
				if( gifs !== []) {
					message.channel.send(`${removedTrigger}`, {
					    file: gifs[0].images.original.url // Or replace with FileOptions object
					});
					return 'Found something on giphy';
				}

				message.channel.send(`I didn't find anything for ${removedTrigger}`);
				return 'Found nothing';
			}).catch(e => {
				message.channel.send("Not a valid command");
				message.channel.send(`Avaiable commands ${PRINT_COMMANDS()}`);
				return 'Not a valid command';	
			});
		} catch(error) {
			console.log(error);
			return 'failed';
		}
		
	},
};
