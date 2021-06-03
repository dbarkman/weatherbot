const weatherAPIKey = process.env.weatherAPIKey;
const fetch = require('node-fetch');
const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
	name: 't',
	description: 'Fetch the current temperature for the provided airport.',
	async execute(message, args) {
        let airport = args[0];
        if (airport.length == 3) airport = 'k' + airport;
    
        const { location, current } = await fetch('http://api.weatherapi.com/v1/current.json?key=' + weatherAPIKey + '&q=metar:' + airport).then(response => response.json());
        let currentTemp = current.temp_f;
        let tempFormat = '℉';
        let forUS = '';
        if (location.country !== 'United States') {
            currentTemp = current.temp_c;
            tempFormat = '℃';
            forUS = ' (that\'s ' + current.temp_f + ' ℉ for the Imperialist 😉)';
        }
        message.channel.send('The current temperature at ' + location.name + ' is: ' + currentTemp + ' ' + tempFormat + forUS);
    },
};
