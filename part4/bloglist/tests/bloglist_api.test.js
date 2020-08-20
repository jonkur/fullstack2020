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

describe('route GET /', () => {
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

describe('route POST /', () => {
  test('adds the new blog to database of existing blogs and increases it\'s size by one', async () => {
    const blog = {
      title: 'Test blog',
      author: 'Test Author',
      url: 'test url'
    }
    const postreq = await api.post('/api/blogs')
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const res = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const savedBlog = res.body.find(b => b.id === postreq.body.id)

    expect(res.body).toHaveLength(dummyBlogs.length + 1)
    expect(savedBlog.title).toEqual(blog.title)
    expect(savedBlog.author).toEqual(blog.author)
    expect(savedBlog.url).toEqual(blog.url)
  })

  test.only('adds the \'likes\' property to the new blog object if it is not provided', async () => {
    const blog = {
      title: 'Test blog',
      author: 'Test Author',
      url: 'test url'
    }
    const postreq = await api.post('/api/blogs')
      .send(blog)

    expect(postreq.body.likes).toBeDefined()
    expect(postreq.body.likes).toBe(0)
  })
})

afterAll(() => {
  mongoose.connection.close()
})