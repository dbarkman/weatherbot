const weatherAPIKey = process.env.weatherAPIKey;
const fetch = require('node-fetch');
const Discord = require('discord.js');
const client = new Discord.Client();
 
module.exports = {
	name: 'c',
	description: 'Fetch the current conditions for the provided airport.',
	async execute(message, args) {
        let airport = args[0];
        if (airport.length == 3) airport = 'k' + airport;
    
        const { location, current } = await fetch('http://api.weatherapi.com/v1/current.json?key=' + weatherAPIKey + '&q=metar:' + airport).then(response => response.json());
        const airportName = location.name;
        let currentTemp = current.temp_f;
        let tempFormat = '℉';
        const currentIcon = 'http:' + current.condition.icon;
        const currentCondition = current.condition.text;
        let winds = current.wind_mph + ' mph, ';
        const windDirection = 'from the ' + current.wind_dir;
        let pressure = current.pressure_in + ' inches';
        const humidity = current.humidity;
        const uv = (current.uv < 0) ? 0 : current.uv;
        let uvMessage = '';

        if (currentCondition == 'Sunny') {
            switch (true) {
                case (uv <= 2):
                    uvMessage = ' Enjoy the sun and get some vitamin D, the UV index is low at: ' + uv + '.';
                    break;
                case (uv <= 5):
                    uvMessage = ' Don\'t stay in the sun too long, the UV index is moderate at: ' + uv + '.';
                    break;
                case (uv <= 7):
                    uvMessage = ' Grab your sunblock and hat, the UV index is high at: ' + uv + '.';
                    break;
                default:
                    uvMessage = ' Probably best not to go outside, the UV index is extreme at: ' + uv + '.';
                    break;
            }
        } else {
            uvMessage = ' Maybe grab an unbrella, in case it rains.'
        }
    
        if (location.country !== 'United States') {
            currentTemp = current.temp_c;
            tempFormat = '℃';
            winds = current.wind_kph + ' kph, ';
            pressure = current.pressure_mb + ' millibars'
        }
        message.channel.send(currentIcon);
        message.channel.send(' The current conditions at ' + airportName + ' are: ' + currentTemp + ' ' + tempFormat + ', ' + currentCondition + ', with winds at ' + winds + windDirection + ', pressure at ' + pressure + ' and a humidity of ' + humidity + '. ' + uvMessage);
    },
};
