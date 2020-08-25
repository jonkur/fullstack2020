const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
})

describe('adding a new user', () => {
  test('succeeds with status code 201 and returns the saved user when username and password are provided', async () => {
    const user = {
      username: 'testuser',
      name: 'test name',
      password: 'secretpass'
    }
    const savedUser = await api.post('/api/users')
      .send(user)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(savedUser.body.username).toBe(user.username)
    expect(savedUser.body.name).toBe(user.name)
    expect(savedUser.body.password).toBeUndefined()
    expect(savedUser.body.pwHash).toBeUndefined()
  })

  test('will not succeed and responds with status code 409 if there is already a user with same username in the database', async () => {
    const user = {
      username: 'testuser',
      name: 'test name',
      password: 'secretpass'
    }
    await api.post('/api/users')
      .send(user)
      .expect(201)

    await api.post('/api/users')
      .send(user)
      .expect(409)
  })

  test('will not succeed and return a status code 400 if username does not exist or is under 3 characters long', async () => {
    let user = {
      username: 'ab',
      name: 'testname',
      password: 'secretpass'
    }
    let response = await api.post('/api/users')
      .send(user)
      .expect(400)

    expect(response.body).toEqual({})
    expect(response.text).toContain('minimum length for username is 3 characters')

    user = {
      name: 'testname',
      password: 'secretpass'
    }
    response = await api.post('/api/users')
      .send(user)
      .expect(400)

    expect(response.body).toEqual({})
    expect(response.text).toContain('Path `username` is required')
  })

  test('will not succeed and return a status code 400 if password does not exist or is under 3 characters long', async () => {
    let user = {
      username: 'abcdef',
      name: 'testname',
      password: 'se'
    }
    let response = await api.post('/api/users')
      .send(user)
      .expect(400)

    expect(response.body).toEqual({})
    expect(response.text).toContain('Password must be at least 3 characters long')

    user = {
      username: 'testuser',
      name: 'testname'
    }
    response = await api.post('/api/users')
      .send(user)
      .expect(400)

    expect(response.body).toEqual({})
    expect(response.text).toContain('Password must be at least 3 characters long')
  })
})

afterAll(() => {
  mongoose.connection.close()
})