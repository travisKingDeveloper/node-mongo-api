const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const logging = require('./logging')

const app = express()
const PORT = process.env.port || 3001
const logger = logging.createLogger('global')

// log global unhandled errors
process.on('unhandledRejection', error => {
    logger.error('Unhandled Promise Rejection', error)
  })
  
process.on('uncaughtException', error => {
    logger.error('Unhandled Error', error)
})

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(logging.createErrLogger('request'))

app.get('/health', function(req, res) {
    res.json({ allGood: 'partner' })
})

app.get('/tables', function(req, res) {
    const tables  = [
        {
            name: 'mahoganey',
            legs: '4',
            seats: '8',
            price: 400,
        },
        {
            name: 'elm',
            legs: '4',
            seats: '8',
            price: 300,
        },
        {
            name: 'oak',
            legs: '4',
            seats: '4',
            price: 100,
        }
    ]

    res.json(tables)
})

app.get('/*', function(req, res){
    res.json({ all: 'good' })
})

app.listen(PORT, function() {
    logger.info(`listening on this port ${PORT}`)
})