const _ = require('lodash')

const dummy = () => {
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

const mostBlogs = (blogs) => {
  if (!blogs || !blogs.length) {
    return {}
  }  

  // Lodash implementation
  return _.zipObject(['author', 'blogs'], _(blogs).countBy(blog => {
    return blog.author
  }).entries().maxBy(blog => blog[1]))
  
  // Non-Lodash implementation
  /*const blogCounts = {}
  blogs.forEach(blog => {
    blogCounts[blog.author] = blogCounts[blog.author]
      ? blogCounts[blog.author] + 1
      : 1
  })
  const blogCountsSorted = Object.entries(blogCounts).sort((a,b) => {
    return b[1] - a[1]
  })
  return { author: blogCountsSorted[0][0], blogs: blogCountsSorted[0][1] }*/
}

const mostLikes = (blogs) => {
  if (!blogs || !blogs.length) {
    return {}
  }

  return _(blogs).groupBy(blog => {
    return blog.author
  }).map((authBlogs, curr) => {
    return { author: curr, likes: _.sumBy(authBlogs, ab => ab.likes) }
  }).maxBy(authLikes => {
    return authLikes.likes
  })
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}