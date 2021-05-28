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
        airport = location.name;
        var currentTemp = current.temp_f;
        var tempFormat = '℉';
        let currentIcon = 'http:' + current.condition.icon;
        let currentCondition = current.condition.text;
        var winds = current.wind_mph + ' mph, ';
        let windDirection = 'from the ' + current.wind_dir;
        var pressure = current.pressure_in + ' inches';
        let humidity = current.humidity;
        var uv = (current.uv < 0) ? 0 : current.uv;
        var uvMessage = '';

        if (currentCondition == 'Sunny') {
            switch (true) {
                case (uv <= 2):
                    uvMessage = ' Enjoy the sun and get some vitamin D, the UV is low at: ' + uv + '.';
                    break;
                case (uv <= 5):
                    uvMessage = ' Don\'t stay in the sun too long, the UV is moderate at: ' + uv + '.';
                    break;
                case (uv <= 7):
                    uvMessage = ' Grab your sunblock and hat, the UV is high at: ' + uv + '.';
                    break;
                default:
                    uvMessage = ' Probably best not to go outside, the UV is extreme at: ' + uv + '.';
                    break;
            }
        } else {
            uvMessage = ' Maybe grab an unbrella, in case it rains.'
        }
    
        if (location.country !== 'United States') {
            currentTemp = current.temp_c;
            tempFormat = '℃';
            var winds = current.wind_kph + ' kph, ';
            var pressure = current.pressure_mb + ' millibars'
        }
        message.channel.send(currentIcon);
        message.channel.send(' The current conditions at ' + airport + ' are: ' + currentTemp + ' ' + tempFormat + ', ' + currentCondition + ', with winds at ' + winds + windDirection + ', pressure at ' + pressure + ' and a humidity of ' + humidity + '. ' + uvMessage);
    },
};
