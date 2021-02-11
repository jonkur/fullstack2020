import axios from 'axios'
const baseUrl = '/api/blogs'

let token = ''

const setToken = (newToken) => {
  token = 'Bearer ' + newToken
}

const getAll = async () => {
  try {
    const res = await axios.get(baseUrl)
    return res.data
  } catch (err) {
    console.log(err)
  }
}

const createBlog = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }
  try {
    const res = await axios.post(baseUrl, blog, config)
    return res.data
  } catch (err) {
    console.log(err)
  }
}

const updateBlog = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }
  const url = `${baseUrl}/${blog.id}`
  try {
    const res = await axios.put(url, blog, config)
    return res.data
  } catch (err) {
    console.log(err)
  }
}

const deleteBlog = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }
  const url = `${baseUrl}/${blog.id}`
  try {
    const res = await axios.delete(url, config)
    return res
  } catch (err) {
    console.log(err)
  }
}

const createComment = async (blog, content) => {
  const url = `${baseUrl}/${blog.id}/comments`
  try {
    const res = await axios.post(url, { content: content })
    return res
  } catch (err) {
    console.log(err)
  }
}

export default { setToken, getAll, createBlog, updateBlog, deleteBlog, createComment }