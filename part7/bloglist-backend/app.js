const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const loginRouter = require('./controllers/login')
const userRouter = require('./controllers/users')
const blogRouter = require('./controllers/blogs')
const logger = require('./utils/logger')
const dbPurgeUtility = require('./utils/dbPurgeUtility')

logger.info('Connecting to MongoDB database...')
mongoose.connect(config.ATLAS_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    logger.info('Connection to MongoDB succesfully established!')
  })
  .catch(err => {
    logger.error('Error connecting to MongoDB database:', err)
  })

app.use(cors())
dbPurgeUtility()
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
app.use('/api/login', loginRouter)
app.use('/api/users', userRouter)
app.use('/api/blogs', blogRouter)

if (process.env.NODE_ENV === 'test') {
  const testResetRouter = require('./controllers/testResetRouter')
  app.use('/api/testing', testResetRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app