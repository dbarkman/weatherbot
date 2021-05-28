require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();

const fs = require('fs');
 
const prefix = process.env.prefix;
const discordToken = process.env.discordToken;

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    
    const args = message.content.slice(prefix.length).trim().split(/:+/);
    const command = args.shift().toLowerCase();
    console.log

    if (!client.commands.has(command)) return;

    try {
        client.commands.get(command).execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
    
    // if (message.content.startsWith(`${prefix}temp`)) {
    //     var airport = args[0];
    //     console.log(args[0]);
    //     if (airport.length == 3) airport = 'k' + airport;
    
    //     const { location, current } = await fetch('http://api.weatherapi.com/v1/current.json?key=' + weatherAPIKey + '&q=metar:' + airport).then(response => response.json());
    //     var currentTemp = current.temp_f;
    //     var tempFormat = '℉';
    //     var forUS = '';
    //     if (location.country !== 'United States') {
    //         currentTemp = current.temp_c;
    //         tempFormat = '℃';
    //         forUS = ' (' + current.temp_f + ' ℉ for the Imperialist 😉)';
    //     }
    //     message.channel.send('The current temprature at ' + location.name + ' is: ' + currentTemp + ' ' + tempFormat + forUS);
    // }
});

client.login(discordToken);
