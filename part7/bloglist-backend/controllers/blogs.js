const Blog = require('../models/blog')
const User = require('../models/user')
const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  res.json(blogs)
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

blogRouter.post('/', async (req, res, next) => {
  if (!req.body.title || !req.body.url) {
    return res.status(400).end()
  }
  if (!req.token) {
    return res.status(401).json({ error: 'token missing' })
  }
  try {
    const decodedToken = jwt.verify(req.token, process.env.TOKEN_SECRET)
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'invalid token' })
    }
    const user = await User.findById(decodedToken.id)
    if (!user) {
      return res.status(401).json({ error: 'invalid token' })
    }
    const blog = new Blog({
      title: req.body.title,
      author: req.body.author,
      url: req.body.url,
      likes: req.body.likes,
      user: user
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    savedBlog.user.blogs = undefined

    res.status(201).json(savedBlog)
  } catch (err) {
    next(err)
  }
})

blogRouter.delete('/:id', async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id)
    if (blog) {
      const decodedToken = jwt.verify(req.token, process.env.TOKEN_SECRET)
      if (!decodedToken.id || decodedToken.id !== blog.user.toString()) {
        return res.status(401).json({ error: 'invalid token' })
      }
      await Blog.deleteOne({ _id: req.params.id })
    }
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
      .populate('user', { username: 1, name: 1 })
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