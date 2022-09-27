const request = require('request')

const weather = (latitude,longitude, callback) => {
    const baseUrl = 'http://api.weatherstack.com/current'

    const apiKey = '276245edb7833e3c21ea63a57f21d7cf'
    const apiKeyQuery = '?access_key='
    const latLongQuery = '&query='

    const url = baseUrl + apiKeyQuery + apiKey + latLongQuery + latitude + ',' + longitude

    request( {url, json: true }, (error, {body}) => {
    if (error) {
        callback('unable to connect to weather services!',undefined)
    } else if (body.current == null) {
        callback('please provide correct latitude or longitude values!',undefined)
    } else {
        callback(undefined, body.current)
    }
})
}

module.exports = weather