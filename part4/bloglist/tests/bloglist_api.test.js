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
  test('returns the correct amount of blogs', async () => {
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

describe('route GET /:id', () => {
  test('returns the correct blog post when supplied with a valid and existing id', async () => {
    const blog = dummyBlogs[4]
    const res = await api.get(`/api/blogs/${blog._id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(res.body.id).toBe(blog._id)
    expect(res.body.title).toBe(blog.title)
    expect(res.body.author).toBe(blog.author)
    expect(res.body.url).toBe(blog.url)
  })

  test('responds with status code 404 if the id is valid but does not exist', async () => {
    const id = new mongoose.Types.ObjectId()
    const res = await api.get(`/api/blogs/${id}`)
      .expect(404)

    expect(res.body).toEqual({})
  })

  test('responds with status code 400 if the id is invalid', async () => {
    const id = 'idthatismalformed'
    const res = await api.get(`/api/blogs/${id}`)
      .expect(400)

    expect(res.body).toEqual({})
  })
})

describe('route POST /', () => {
  test('adds the new blog to database of existing blogs and increases it\'s size by one', async () => {
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

  test('adds the \'likes\' property to the new blog object if it is not provided', async () => {
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

  test('will respond with status code 400 if either \'title\' or \'url\' property is missing from request body', async () => {
    let blog = {
      author: 'Test Author',
      url: 'test url'
    }
    await api.post('/api/blogs')
      .send(blog)
      .expect(400)
  
    blog = {
      title: 'Test title',
      author: 'Test Author'
    }
  
    await api.post('/api/blogs')
      .send(blog)
      .expect(400)
  })
})

describe('route DELETE /:id', () => {
  test('will successfully delete an existing blog post with given id and return status code 204', async () => {
    const blog = dummyBlogs[0]

    await api.delete(`/api/blogs/${blog._id}`)
      .expect(204)

    let res = await api.get(`/api/blogs/${blog._id}`)
      .expect(404)

    expect(res.body).toEqual({})

    res = await api.get('/api/blogs')
      .expect(200)

    expect(res.body.length).toBe(dummyBlogs.length - 1)
  })

  test('responds with 204 and will not delete anything if the supplied id is valid but does not exist', async () => {
    const id = new mongoose.Types.ObjectId()
    await api.delete(`/api/blogs/${id}`)
      .expect(204)
    
    const res = await api.get('/api/blogs')
      .expect(200)

    expect(res.body.length).toBe(dummyBlogs.length)
  })

  test('responds with 400 and will not delete anything if the supplied id is invalid', async () => {
    const id = 'badObjectId'
    await api.delete(`/api/blogs/${id}`)
      .expect(400)

    const res = await api.get('/api/blogs')
      .expect(200)

    expect(res.body.length).toBe(dummyBlogs.length)
  })
})

describe('route PUT /:id', () => {
  test('will update the correct blog post with given request data', async () => {
    const oldBlog = dummyBlogs[1]
    const updatedBlog = {
      title: oldBlog.title,
      author: oldBlog.author,
      url: oldBlog.url,
      likes: oldBlog.likes + 1
    }
    await api.put(`/api/blogs/${oldBlog._id}`)
      .send(updatedBlog)
      .expect(200)
    
    const res = await api.get(`/api/blogs/${oldBlog._id}`)
      .expect(200)

    expect(res.body.title).toBe(oldBlog.title)
    expect(res.body.author).toBe(oldBlog.author)
    expect(res.body.url).toBe(oldBlog.url)
    expect(res.body.likes).toBe(updatedBlog.likes)
  })

  test('will not update anything if either title or url are missing from request data and responds with status code 400', async () => {
    const oldBlog = dummyBlogs[1]
    let updatedBlog = {
      author: oldBlog.author,
      url: oldBlog.url,
      likes: oldBlog.likes + 1
    }
    let res = await api.put(`/api/blogs/${oldBlog._id}`)
      .send(updatedBlog)
      .expect(400)

    expect(res.body).toEqual({})

    updatedBlog = {
      title: oldBlog.title,
      author: oldBlog.author,
      likes: oldBlog.likes + 1
    }
    res = await api.put(`/api/blogs/${oldBlog._id}`)
      .send(updatedBlog)
      .expect(400)

    expect(res.body).toEqual({})
  })

  test('will respond with 404 if supplied with non-existing id', async () => {
    const id = new mongoose.Types.ObjectId()
    const res = await api.put(`/api/blogs/${id}`)
      .send({ title: 'fake tiltle', url: 'fake url', likes: 2 }) // supply mandatory title and url
      .expect(404)
    
    expect(res.body).toEqual({})
  })

  test('will respond with 400 if supplied with invalid id', async () => {
    const id = "abcdefg"
    const blog = {
      title: "faketitle",
      url: "fakeurl"
    }
    const res = await api.put(`/api/blogs/${id}`)
      .send(blog)
      .expect(400)

    expect(res.body).toEqual({})
  })
})


afterAll(() => {
  mongoose.connection.close()
})