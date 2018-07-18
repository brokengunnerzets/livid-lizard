const configs = require('./configs');
const client = require('./bot-client');
const controller = require('./bot-controller');

const initBot = function () {
	client.start();
};

initBot();