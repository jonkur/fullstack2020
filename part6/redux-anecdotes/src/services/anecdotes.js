import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}

const createNew = async (content) => {
    const obj = { content, votes: 0 }
    const res = await axios.post(baseUrl, obj)
    return res.data
}

const vote = async id => {
    const res = await axios.get(`${baseUrl}/${id}`)
    const anecdote = res.data
    anecdote.votes++
    await axios.put(`${baseUrl}/${id}`, anecdote)
    return anecdote
}

export default { getAll, createNew, vote }