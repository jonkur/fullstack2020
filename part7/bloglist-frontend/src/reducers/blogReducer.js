const initialState = {
  blogs: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_BLOGS': {
      const { blogs } = action.payload
      return { ...state, blogs: blogs }
    }
    case 'ADD_BLOG': {
      const { blog } = action.payload
      return { ...state, blogs: state.blogs.concat(blog) }
    }
    case 'UPDATE_BLOG': {
      const { updatedBlog } = action.payload
      const updatedBlogs = state.blogs.map(b => {
        return updatedBlog.id === b.id ? updatedBlog : b
      })
      return { ...state, blogs: updatedBlogs }
    }
    case 'ADD_COMMENT': {
      const { blog, content } = action.payload
      const updatedBlogs = state.blogs.map(b => {
        return blog.id === b.id ? {
          ...b,
          comments: b.comments.concat(content)
        } : b
      })
      return { ...state, blogs: updatedBlogs }
    }
    case 'DELETE_BLOG': {
      const { deletedBlog } = action.payload
      const remainingBlogs = state.blogs.filter(b => {
        return deletedBlog.id !== b.id
      })
      return { ...state, blogs: remainingBlogs }
    }
    default:
      return state
  }
}