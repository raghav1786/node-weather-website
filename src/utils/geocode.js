const request = require('request')

const geocode = (address,callback) => {
    const baseUrl = 'http://api.openweathermap.org/geo/1.0/direct'
    const appId = '695a56f49632647d19e704d47f8f7ba8'
    const url = baseUrl + '?q=' + encodeURIComponent(address) + '&appid=' + appId
    
    request( {url, json: true }, (error, {body}) => {
        if (error) {
            callback('unable to connect to location services!',undefined)
        } else if (body.length == 0) {
            callback('unable to find the location. try another search',undefined)
        }  else {
            callback(undefined, {
                latitude: body[0].lat,
                longitude: body[0].lon,
                location: body[0].name + ', '+ body[0].state + ', ' +body[0].country
            })
        }
    })
}

module.exports = geocode