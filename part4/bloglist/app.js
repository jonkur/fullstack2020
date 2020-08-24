const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const blogRouter = require('./controllers/blogs')
const logger = require('./utils/logger')

logger.info('Connecting to MongoDB database...')
mongoose.connect(config.ATLAS_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => {
    logger.info('Connection to MongoDB succesfully established!')
  })
  .catch(err => {
    logger.error('Error connecting to MongoDB database:', err)
  })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/blogs', blogRouter) // routes
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app