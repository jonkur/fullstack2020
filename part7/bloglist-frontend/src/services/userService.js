import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
  try {
    const res = await axios.get(baseUrl)
    return res.data
  } catch (err) {
    return err
  }
}

export default { getAll }