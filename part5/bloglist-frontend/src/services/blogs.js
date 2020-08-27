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

export default { setToken, getAll, createBlog }