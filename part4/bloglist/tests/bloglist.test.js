const listHelper = require('../utils/list_helper')

const dummyBlogs = [{
  _id: "5a422a851b54a676234d17f7",
  title: "React patterns",
  author: "Michael Chan",
  url: "https://reactpatterns.com/",
  likes: 7,
  __v: 0
},
{
  _id: "5a422aa71b54a676234d17f8",
  title: "Go To Statement Considered Harmful",
  author: "Edsger W. Dijkstra",
  url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
  likes: 5,
  __v: 0
},
{
  _id: "5a422b3a1b54a676234d17f9",
  title: "Canonical string reduction",
  author: "Edsger W. Dijkstra",
  url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
  likes: 12,
  __v: 0
},
{
  _id: "5a422b891b54a676234d17fa",
  title: "First class tests",
  author: "Robert C. Martin",
  url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
  likes: 10,
  __v: 0
},
{
  _id: "5a422ba71b54a676234d17fb",
  title: "TDD harms architecture",
  author: "Robert C. Martin",
  url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
  likes: 0,
  __v: 0
},
{
  _id: "5a422bc61b54a676234d17fc",
  title: "Type wars",
  author: "Robert C. Martin",
  url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
  likes: 2,
  __v: 0
}]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('is calculated correctly', () => {
    const result = listHelper.totalLikes(dummyBlogs)
    expect(result).toBe(36)
  })

  test('is zero when empty array is passed', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('is the number of likes on one blog listing if the array only contains that blog listing', () => {
    const tempArr = []
    tempArr.push(dummyBlogs[1])
    const result = listHelper.totalLikes(tempArr)
    expect(result).toBe(dummyBlogs[1].likes)
  })
})

describe('favourite blog', () => {
  test('is the one with most votes', () => {
    const result = listHelper.favoriteBlog(dummyBlogs)
    expect(result).toEqual(dummyBlogs[2])
  })

  test('is an empty object if the passed list was empty', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toEqual({})
  })
})

describe('author with most blogs', () => {
  test('is the right one', () => {
    const result = listHelper.mostBlogs(dummyBlogs)
    expect(result).toEqual({ author: 'Robert C. Martin', blogs: 3 })
  })

  test('is an empty object if empty list is passed to the function', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toEqual({})
  })

  test('is the only one in an array that only contains one blog, with only one blog posted', () => {
    const result = listHelper.mostBlogs( [dummyBlogs[0]] )
    expect(result).toEqual({ author: dummyBlogs[0].author, blogs: 1 })
  }) 
})

describe('author with most likes', () => {
  test('is the right one', () => {
    const result = listHelper.mostLikes(dummyBlogs)
    expect(result).toEqual({ author: "Edsger W. Dijkstra", likes: 17 })
  })

  test('is an empty object if empty list is passed to the function', () => {
    const result = listHelper.mostLikes([])
    expect(result).toEqual({})
  })

  test('is the only one in an array that only contains one blog, with the right amount of likes', () => {
    const result = listHelper.mostLikes( [dummyBlogs[0]] )
    expect(result).toEqual({ author: dummyBlogs[0].author, likes: 7 })
  })
})