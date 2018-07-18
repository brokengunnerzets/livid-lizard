const configs = require('./configs');
const client = require('./bot-client');
const controller = require('./bot-controller');

const initBot = function () {
	try {
		client.start();	
	} catch(e) {
		console.log(e);
	}
	
};

initBot();