require('dotenv').config()

let ATLAS_URL = process.env.ATLAS_URL
let PORT = process.env.PORT || 3003

if (process.env.NODE_ENV === 'test') {
  ATLAS_URL = process.env.ATLAS_TEST_URL
}

module.exports = {
  ATLAS_URL,
  PORT
}