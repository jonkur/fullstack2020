const User = require('../models/user')
const userRouter = require('express').Router()
const bcrypt = require('bcrypt')

userRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', {title: 1, author: 1, url: 1, likes: 1})
  res.send(users)
})

userRouter.post('/', async (req, res, next) => {
  const body = req.body

  if (!body.password || body.password.length < 3) {
    return res.status(400).send('Password must be at least 3 characters long.')
  }

  const pwHash = await bcrypt.hash(body.password, 10)

  const user = new User({pwHash, ...body})
  
  try {
    const savedUser = await user.save()
    res.status(201).json(savedUser)
  } catch (err) {
    next(err)
  }
  
})

module.exports = userRouter