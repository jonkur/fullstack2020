import blogService from '../services/blogService'
import { setNotificationWithTimeout } from './notificationActions'
import { fetchAllUsersAsync } from './userActions'

const ADD_BLOG = 'ADD_BLOG'
const SET_BLOGS = 'SET_BLOGS'
const UPDATE_BLOG = 'UPDATE_BLOG'
const DELETE_BLOG = 'DELETE_BLOG'
const ADD_COMMENT = 'ADD_COMMENT'

const addBlog = (blog) => {
  return {
    type: ADD_BLOG,
    payload: {
      blog
    }
  }
}

const setBlogs = (blogs) => {
  return {
    type: SET_BLOGS,
    payload: {
      blogs
    }
  }
}

const updateBlog = (blog) => {
  return {
    type: UPDATE_BLOG,
    payload: {
      updatedBlog: blog
    }
  }
}

const deleteBlog = (blog) => {
  return {
    type: DELETE_BLOG,
    payload: {
      deletedBlog: blog
    }
  }
}

const addComment = (blog, content) => {
  return {
    type: ADD_COMMENT,
    payload: {
      blog, content
    }
  }
}

export const addBlogAsync = (blogObj) => {
  return dispatch => {
    (async () => {
      const blog = await blogService.createBlog(blogObj)
      if (!blog) {
        dispatch(setNotificationWithTimeout('Blog entry creation failed', true, 3000))
      } else {
        dispatch(addBlog(blog))
        dispatch(fetchAllUsersAsync())
        dispatch(setNotificationWithTimeout('New blog entry created!', false, 3000))
      }
    })()
  }
}

export const fetchAllBlogsAsync = () => {
  return dispatch => {
    (async () => {
      const blogs = await blogService.getAll()
      dispatch(setBlogs(blogs))
    })()
  }
}

export const updateBlogAsync = (blogObj) => {
  return dispatch => {
    (async () => {
      const blog = await blogService.updateBlog(blogObj)
      if (!blog) {
        dispatch(setNotificationWithTimeout('Error updating the blog entry!', true, 3000))
      } else {
        dispatch(updateBlog(blog))
      }
    })()
  }
}

export const deleteBlogAsync = (blogObj) => {
  return dispatch => {
    (async () => {
      const res = await blogService.deleteBlog(blogObj)
      if (res && res.status === 204) {
        dispatch(deleteBlog(blogObj))
        dispatch(setNotificationWithTimeout('Blog entry deleted.', false, 3000))
      } else {
        dispatch(setNotificationWithTimeout('Error deleting blog entry!', true, 3000))
      }
    })()
  }
}

export const addCommentAsync = (blog, content) => {
  return dispatch => {
    (async () => {
      const res = await blogService.createComment(blog, content)
      if (res && res.status === 200) {
        dispatch(addComment(blog, content))
        dispatch(setNotificationWithTimeout('Comment successfully added.', false, 3000))
      } else {
        dispatch(setNotificationWithTimeout('Error adding comment.', true, 3000))
      }
    })()
  }
}