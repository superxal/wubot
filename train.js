var Helpers = require('./helpers.js');

module.exports = {
    train: function (formatted, action, bot, channel, params) {

        var trainApi = 'http://api.trafikinfo.trafikverket.se/v1.2/data.json';
        var location;
        var toLocation;
        var toLocationLong;

        if (formatted.indexOf(" ") === -1) { //TODO 
            bot.postMessage(channel, "Felaktigt kommando.", params);
            return;
        }

        switch (action) {

            case 'J�NK�PING':
                location = 'J�';
                toLocation = 'V';
                toLocationLong = 'V�rnamo'
                action = 'J�nk�ping';
                break;
            case 'V�RNAMO':
                toLocation = 'J�';
                toLocationLong = 'J�nk�ping'
                location = 'V';
                action = 'V�rnamo';
                break;
            default:
                //toLocation = 'J�';
                //toLocationLong = 'J�nk�ping'
                //location = 'V';
                //action = 'V�rnamo';
                //console.log(action + "default")
                bot.postMessage(channel, "Finns ingen matchande plats!", { icon_emoji: ":station:" });
                break;
        }

        var response = '---T�g fr�n ' + action + '---';
        var trains = Helpers.getTrains(location, trainApi);
        
        for (var i = 0; i < trains.RESPONSE.RESULT[0].TrainAnnouncement.length; i++) {
            if (trains.RESPONSE.RESULT[0].TrainAnnouncement[i].ToLocation[0].LocationName == toLocation) {
                response += '\n Till ' + toLocationLong + ' : ' + trains.RESPONSE.RESULT[0].TrainAnnouncement[i].AdvertisedTimeAtLocation.split('T').pop();
            }
        };
        response += '\n -------------------------';
        bot.postMessage(channel, response, params);
    }
}