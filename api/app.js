const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const http = require('http')
const logging = require('./logging')

const app = express()
const PORT = process.env.port || 3000
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

app.get('/*', function(req, res){
    res.json({ all: 'good' })
})

const server = http.createServer(app)

server.listen(PORT, function() {
    logger.info(`listening on this port ${PORT}`)
})