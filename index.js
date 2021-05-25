const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, discordToken, weatherAPIKey } = require('./config.json');
const fetch = require('node-fetch');

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
    if (message.content.startsWith(`${prefix}test`)) {
        console.log('Test passed!');
    }
})

client.on('message', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    
    if (message.content === '!ping') {
        message.channel.send('Pong! 🏓');
        return;
    }

    const args = message.content.slice(prefix.length).trim().split(/:+/);
	const command = args.shift().toLowerCase();
    var airport = args[0];
    console.log(args[0]);
    if (airport.length == 3) airport = 'k' + airport;

    if (command === 'temp') {
        const { location, current } = await fetch('http://api.weatherapi.com/v1/current.json?key=' + weatherAPIKey + '&q=metar:' + airport).then(response => response.json());
        var currentTemp = current.temp_f;
        var tempFormat = '℉'
        if (location.country !== 'United States') {
            currentTemp = current.temp_c;
            tempFormat = '℃';
        }
        message.channel.send('The current temprature at ' + location.name + ' is: ' + currentTemp + ' ' + tempFormat);
    }

});

client.login(discordToken);
