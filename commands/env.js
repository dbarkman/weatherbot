require('dotenv').config();
const environment = process.env.environment;

module.exports = {
	name: 'env',
	description: 'Report back which environment is responding.',
	execute(message, args) {
		message.channel.send('Your requests are being processed by: ' + environment + '.');
	}
};