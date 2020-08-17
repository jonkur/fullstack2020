require('dotenv').config()

const ATLAS_URL = process.env.ATLAS_URL
const PORT = process.env.PORT || 3003

module.exports = {
  ATLAS_URL,
  PORT
}