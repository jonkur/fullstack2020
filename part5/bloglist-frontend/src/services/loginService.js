import axios from 'axios'

const loginUser = async (username, password) => {
    const reqData = { username, password }
    try {
        const user = await axios.post('/api/login', reqData)
        return user.data
    } catch (err) {
        console.log(err)
    }
    return null
}

export default { loginUser }