const logger = require('./logger')

const requestLogger = (req, res, next) => {
  logger.info('Method:', req.method)
  logger.info('Path:', req.path)
  logger.info('Body:', req.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (req, res) => {
  logger.info('Last request was made to an unknown endpoint')
  logger.info('...')
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (err, req, res, next) => {
  logger.error(err.message)
  if (err.name === 'CastError') {
    res.status(400).send('Malformed ID')
  }
  else if (err.name === 'ValidationError') {
    if (err.message.includes('expected `username` to be unique')) {
      res.status(409).send(err.message)
    } else {
      res.status(400).send(err.message)
    }
  }
  next(err)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}