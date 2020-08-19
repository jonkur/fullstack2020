const Blog = require('../models/blog')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const dummyBlogs = require('./dummyblogs')

const api = supertest(app)

beforeEach(async () => {
  // Init test db
  await Blog.deleteMany({})
  
  const blogs = dummyBlogs.map(b => new Blog(b))
  const promiseArr = blogs.map(b => b.save())
  await Promise.all(promiseArr)
})

describe('route /', () => {
  test('returns the correct amonut of blogs', async () => {
    const res = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-type', /application\/json/)

    expect(res.body).toHaveLength(dummyBlogs.length)
  })

  test('returns blogs with the mongoDB _id property changed to id', async () => {
    const res = await api.get('/api/blogs')

    res.body.forEach(blog => {
      expect(blog.id).toBeDefined()
      expect(blog._id).toBeFalsy()
    })
  })

})

afterAll(() => {
  mongoose.connection.close()
})