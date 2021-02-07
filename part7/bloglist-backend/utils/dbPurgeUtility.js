const Blog = require('../models/blog')
const User = require('../models/user')

const dbPurgeUtility = () => {
  if (process.env.PURGE_DB === 'true') {
    Blog.deleteMany({}).then(() => {
      User.deleteMany({}).then(() => {
        process.exit()
      })
    })
  }
}

module.exports = dbPurgeUtility