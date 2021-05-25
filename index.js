require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = process.env.prefix;
const discordToken = process.env.discordToken;
const weatherAPIKey = process.env.weatherAPIKey;
const environment = process.env.environment;
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

    if (message.content === '!env') {
        message.channel.send(environment);
        return;
    }

    if (message.content.startsWith(`${prefix}temp`)) {
        const args = message.content.slice(prefix.length).trim().split(/:+/);
        const command = args.shift().toLowerCase();
        var airport = args[0];
        console.log(args[0]);
        if (airport.length == 3) airport = 'k' + airport;
    
        if (command === 'temp') {
            const { location, current } = await fetch('http://api.weatherapi.com/v1/current.json?key=' + weatherAPIKey + '&q=metar:' + airport).then(response => response.json());
            var currentTemp = current.temp_f;
            var tempFormat = '℉';
            var forUS = '';
            if (location.country !== 'United States') {
                currentTemp = current.temp_c;
                tempFormat = '℃';
                forUS = ' (' + current.temp_f + ' ℉ for the Imperialist 😉)';
            }
            message.channel.send('The current temprature at ' + location.name + ' is: ' + currentTemp + ' ' + tempFormat + forUS);
        }
    }
});

client.login(discordToken);
