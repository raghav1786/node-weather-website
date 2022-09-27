const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

const app = express()

const port = process.env.PORT || 3000

// Define path for express configs
const viewPath = path.join(__dirname,'../templates/views')
const publicDirectoryPath = path.join(__dirname,'../public')
const partialsPath = path.join( __dirname,'../templates/partials')

// setup handlebars engine views and locations
app.set('view engine','hbs')
app.set('views', viewPath)

hbs.registerPartials(partialsPath)


// setup static directory to serve
 app.use(express.static(publicDirectoryPath))

app.get('',(req, res) => {
    res.render('index', {
        title: 'Weather',
        name: ' Andrew'

    })
})

app.get('/about',(req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Andrew'

    })
})

app.get('/help',(req, res) => {
    res.render('help', {
        title: 'help me',
        name: ' Andrew'

    })
})

app.get('/weather',(req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you must provide a address term'
        })
    }
    if (req.query.address) {
        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if (error) {
                res.send({
                    error: error
                })
            } else {
                weather(latitude,longitude,(error, response) => {
                    if (error) {
                        res.send({
                            error: error
                        })
                    } else {
                        console.log(response)
                        const forecast = 'It is currently ' + response.temperature + ' degrees out.' + ' There is ' + response.precip +'% chance of rain & Humidity is ' + response.humidity + '%'
                        res.send({
                            forcast: forecast,
                            location
                        })
                    }
                })
            }
        })
    } else {
        console.log('please provide valid address')
    }
})


app.get('/products', (req, res)=> {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*',(req, res)=> {
    res.render('404Error', {
        title: '404',
        error: 'Help article not found',
        name: ' Andrew'
    })
})

app.get('*',(req, res) => {
    res.render('404Error', {
        title: '404',
        error: 'Page not found',
        name: ' Andrew'
    })
})

app.listen(port, () => {
    console.log('server is up on port ' + port)
})