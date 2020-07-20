const request = require('postman-request')
const baseUrlWeather = 'http://api.weatherstack.com/current?access_key=71a490cdf23d9a8a3671670e593b347f&query='



const forecast = (latitude, longitude, callback) => {
    const url = `${baseUrlWeather}${latitude},${longitude}`

    request({ url, json: true}, (error, { body }) => {
        if(error){
            callback('Unable to connect to weather service!', undefined)
        } else if(body.error){
            callback('Unable to find location!', undefined)
        } else{
            callback(undefined,
                `${body.current.weather_descriptions[0]}. ` +
                `It is currently ${body.current.temperature} degrees out. `+
                `It feels like ${body.current.feelslike} degrees out.`)
        }
    })
}

module.exports = forecast