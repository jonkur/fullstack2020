const Blog = require('../models/blog')
const blogRouter = require('express').Router()

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).exec()
  res.json(blogs)
  /*Blog
    .find({})
    .then(blogs => {
      res.json(blogs)
    })*/
})

blogRouter.post('/', async (req, res) => {
  if (!req.body.title || !req.body.url) {
    return res.status(400).end()
  }
  const blog = new Blog(req.body)

  const savedBlog = await blog.save()
  res.status(201).json(savedBlog)

  /*blog
    .save()
    .then(result => {
      res.status(201).json(result)
    })*/
})

module.exports = blogRouter