const blog = require("../models/blog")

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => {
    return total + blog.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((favBlog, blog) => {
    if (!favBlog.likes) {
      return blog
    }
    return favBlog.likes < blog.likes ? blog : favBlog
  }, {})
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}