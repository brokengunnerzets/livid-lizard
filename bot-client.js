const Discord = require('discord.js');

const { discordToken } = require('./configs');
const controller = require('./bot-controller');

const start = async () => {
	const client = new Discord.Client();

	client.on("ready", () => {
	  console.log("I am ready!");
	});

	client.on("message", async (message) => {
	  	try {
		  	const result = await controller.handle(message);
		  	console.log(result);
		} catch(e) {
			console.log(e);
		}
	});
	client.login(discordToken);
};

module.exports = {
	start,
};
