const request = require('postman-request')
const baseUrlGeo = 'https://api.mapbox.com/geocoding/v5/mapbox.places'
const fixedParams = '.json?access_token=pk.eyJ1Ijoic2hhZHNjY3AiLCJhIjoiY2tjbWwwbTEzMDIzdzJzbGN0YnFndHVvbCJ9.0mVcnO62245PF7TmDQxnrg&limit=1'

const geocode = (address, callback) => {
    const url = `${baseUrlGeo}/${encodeURIComponent(address)}${fixedParams}`

    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to the geolocation service!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location!', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode