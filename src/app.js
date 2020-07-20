const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const viewsPath = path.join(__dirname, '../templates/views')
const publicPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Rodrigo F'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Rodrigo F'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Rodrigo F',
        message: 'This is a help message!'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a address.'
        })
    }

    const address = req.query.address;

    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) return res.send({ error })

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) return res.send({ error })

            res.send({
                forecast: forecastData,
                location,
                address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Rodrigo F',
        message: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Rodrigo F',
        message: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000\nhttp://localhost:3000')
})