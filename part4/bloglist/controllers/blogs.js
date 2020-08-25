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

blogRouter.get('/:id', async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id)
    if (blog) {
      res.json(blog)
    } else {
      res.status(404).send('404 - blog not found')
    }
  } catch (err) {
    next(err)
  }
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

blogRouter.delete('/:id', async (req, res, next) => {
  try {
    await Blog.deleteOne({ _id: req.params.id })
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

blogRouter.put('/:id', async (req, res, next) => {
  if (!req.body.title || !req.body.url) {
    return res.status(400).end()
  }

  const updatedBlog = {
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes
  }
  
  try {
    const response = await Blog.findByIdAndUpdate(req.params.id, updatedBlog, { new: true })
    if (response) {
      res.status(200).send(response)
    } else {
      res.status(404).end()
    }
    
  } catch (err) {
    next(err)
  }

})

module.exports = blogRouter