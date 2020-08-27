const Blog = require('../models/blog')
const User = require('../models/user')

const dbPurgeUtility = () => {
  if (process.env.PURGE_DB === 'true') {
    console.log('purging...')
    Blog.deleteMany({}).then(() => {
      User.deleteMany({}).then(() => {
        console.log('database purged')
        process.exit()
      })
    })
  }
}

module.exports = dbPurgeUtility