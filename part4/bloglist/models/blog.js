const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: {
    type: Number,
    default: 0
  }
})

blogSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, obj) => {
    obj.id = obj._id.toString()
    delete obj._id
    delete obj.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)